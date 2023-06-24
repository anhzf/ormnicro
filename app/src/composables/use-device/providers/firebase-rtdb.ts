import { useFirestore, useRTDB } from '@vueuse/firebase'
import { get as rtdbGet, ref as rtdbRef, update } from 'firebase/database'
import type { DocumentReference } from 'firebase/firestore'
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import type { Ref } from 'vue'
import type { Device, GetDevice, MonitoringType, NozzleMode, StartCompostMonitoring, StartMaggotMonitoring, StopCompostMonitoring, StopMaggotMonitoring, UseCompostParameters, UseDevice, UseMaggotParameters } from '~/composables/use-device/types'
import { db, rtdb } from '~/services/firebase'

const DEVICE_STATS_RTDB_PATHS = Object.freeze<Record<MonitoringType, string>>({
  compost: '/Monitoring/Compost/{deviceId}',
  maggot: '/Monitoring/Maggot/{deviceId}',
})

interface _Session {
  type: MonitoringType
  startAt: Timestamp
  stoppedAt: Timestamp | null
  nozzleMode: number
  capacity: number
}

interface _CompostParameters {
  isOnline: boolean
  isLightOn: boolean
  humidity: number
  temperature: number
  pH: number
  waterLevel: number
  activeSessionId?: string
}

interface _MaggotParameters {
  isOnline: boolean
  isLightOn: boolean
  humidity: number
  temperature: number
  lumix: number
  waterLevel: number
  activeSessionId?: string
}

const fromSource = {
  nozzleMode: (mode?: number): NozzleMode => {
    switch (mode) {
      case 1:
        return 'MANUAL'
      default:
        return 'AUTO'
    }
  },
}

const getDevice: GetDevice = (maybeRefId) => {
  const id = isRef(maybeRefId) ? maybeRefId : ref(maybeRefId)
  const { extended: userData } = useUser()
  const deviceRef = computed(() => doc(db(), 'Devices', id.value))
  const data = useFirestore(deviceRef, null, { autoDispose: false }) as Ref<Device>
  return computed(() => ({
    id, ...data.value, fromUser: userData.value?.savedDevices[id.value],
  }))
}

const getCurrentDevice = createGlobalState(() => {
  const route = useRoute()
  const deviceId = computed(() => String(route.params.deviceId))
  const device = getDevice(deviceId)
  return device
})

const startMonitoring = async (type: MonitoringType, deviceId: string) => {
  const deviceRef = rtdbRef(rtdb(), DEVICE_STATS_RTDB_PATHS[type].replace('{deviceId}', deviceId))
  const deviceSnapshot = await rtdbGet(deviceRef)

  if (!deviceSnapshot.exists())
    throw new Error(`Device not found or ${type} monitoring is not available!`)

  const session = await addDoc(collection(db(), 'Devices', deviceId, 'Sessions'), <_Session>{
    type,
    startAt: Timestamp.now(),
    stoppedAt: null,
    nozzleMode: 0,
    capacity: 0,
  })

  await Promise.allSettled([
    update(deviceRef, {
      activeSessionId: session.id,
    }),

    updateDoc(doc(db(), 'Devices', deviceId), {
      [`activeSessions.${type}`]: session.id,
    }),
  ])
}

const stopMonitoring = async (type: MonitoringType, deviceId: string) => {
  const deviceRef = rtdbRef(rtdb(), DEVICE_STATS_RTDB_PATHS[type].replace('{deviceId}', deviceId))
  const deviceSnapshot = await rtdbGet(deviceRef)

  if (!deviceSnapshot.exists())
    throw new Error(`Device not found or ${type} monitoring is not available!`)

  const sessId = deviceSnapshot.val().activeSessionId
  if (!sessId)
    throw new Error('Device doesn\'t have an active session!')

  const sessRef = doc(db(), 'Devices', deviceId, 'Sessions', sessId)

  await Promise.allSettled([
    updateDoc(sessRef, {
      stoppedAt: new Date(),
    }),

    updateDoc(doc(db(), 'Devices', deviceId), {
      [`activeSessions.${type}`]: null,
    }),

    update(deviceRef, {
      activeSessionId: null,
    }),
  ])
}

const useCompostParameters: UseCompostParameters = (maybeRefDeviceId) => {
  const deviceId = isRef(maybeRefDeviceId) ? maybeRefDeviceId : ref(maybeRefDeviceId)
  const isDeviceDataLoaded = ref(false)
  const deviceRef = rtdbRef(rtdb(), DEVICE_STATS_RTDB_PATHS.compost.replace('{deviceId}', deviceId.value))
  const deviceData = useRTDB<_CompostParameters>(deviceRef)
  const sessRef = computed(() => deviceData.value
    && doc(db(), `Devices/${deviceId.value}/Sessions/${deviceData.value?.activeSessionId}`) as DocumentReference<_Session>)
  const sessData = useFirestore(sessRef)

  watchOnce(deviceData, () => {
    isDeviceDataLoaded.value = true
  })

  // watch([sessData, deviceData], v => console.log(v), { immediate: true })

  return computed(() => ({
    startAt: sessData.value?.startAt.toDate() ?? new Date(),
    capacity: sessData.value?.capacity ?? 0,
    isOnline: deviceData.value?.isOnline,
    isLightOn: deviceData.value?.isLightOn,
    humidity: deviceData.value?.humidity,
    temperature: deviceData.value?.temperature,
    nozzleMode: fromSource.nozzleMode(sessData.value?.nozzleMode),
    pH: deviceData.value?.pH,
    waterLevel: deviceData.value?.waterLevel,
    _isReady: !!(sessData.value && deviceData.value),
    _hasSession: !!deviceData.value?.activeSessionId,
  }))
}

const startCompostMonitoring: StartCompostMonitoring = async (deviceId) => {
  await startMonitoring('compost', deviceId)
}

const stopCompostMonitoring: StopCompostMonitoring = async (deviceId) => {
  await stopMonitoring('compost', deviceId)
}

const useMaggotParameters: UseMaggotParameters = (maybeRefDeviceId) => {
  const deviceId = isRef(maybeRefDeviceId) ? maybeRefDeviceId : ref(maybeRefDeviceId)
  const isDeviceDataLoaded = ref(false)
  const deviceRef = rtdbRef(rtdb(), DEVICE_STATS_RTDB_PATHS.maggot.replace('{deviceId}', deviceId.value))
  const deviceData = useRTDB<_MaggotParameters>(deviceRef)
  const sessRef = computed(() => deviceData.value
    && doc(db(), `Devices/${deviceId.value}/Sessions/${deviceData.value?.activeSessionId}`) as DocumentReference<_Session>)
  const sessData = useFirestore(sessRef)

  watchOnce(deviceData, () => {
    isDeviceDataLoaded.value = true
  })

  return computed(() => ({
    startAt: sessData.value?.startAt.toDate() ?? new Date(),
    isOnline: deviceData.value?.isOnline,
    isLightOn: deviceData.value?.isLightOn,
    humidity: deviceData.value?.humidity,
    temperature: deviceData.value?.temperature,
    nozzleMode: fromSource.nozzleMode(sessData.value?.nozzleMode),
    lumix: deviceData.value?.lumix,
    waterLevel: deviceData.value?.waterLevel,
    _isReady: !!(sessData.value && deviceData.value),
    _hasSession: !!deviceData.value?.activeSessionId,
  }))
}

const startMaggotMonitoring: StartMaggotMonitoring = async (deviceId) => {
  await startMonitoring('maggot', deviceId)
}

const stopMaggotMonitoring: StopMaggotMonitoring = async (deviceId) => {
  await stopMonitoring('maggot', deviceId)
}

const useDevice: UseDevice = Object.assign(getDevice, {
  compostParameters: useCompostParameters,
  startCompostMonitoring,
  stopCompostMonitoring,
  maggotParameters: useMaggotParameters,
  startMaggotMonitoring,
  stopMaggotMonitoring,
  current: getCurrentDevice,
})

export default useDevice
