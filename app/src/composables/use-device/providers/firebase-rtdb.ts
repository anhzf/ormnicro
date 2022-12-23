import { useFirestore, useRTDB } from '@vueuse/firebase'
import { ref as dbRef } from 'firebase/database'
import type { DocumentReference, Timestamp } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import type { NozzleMode, UseCompostParameters } from '../types'
import { db, rtdb } from '~/services/firebase'

interface _Session {
  type: 'compost' | 'maggot'
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
  activeSessionId: string
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

export const useCompostParameters: UseCompostParameters = (deviceId) => {
  const isDeviceDataLoaded = ref(false)
  const deviceRef = dbRef(rtdb(), `/Monitoring/Compost/${deviceId}`)
  const deviceData = useRTDB<_CompostParameters>(deviceRef)
  const sessRef = computed(() => deviceData.value
    && doc(db(), 'Devices', deviceId, 'Sessions', deviceData.value.activeSessionId) as DocumentReference<_Session>)
  const sessData = useFirestore(sessRef)

  watchOnce(deviceData, () => {
    isDeviceDataLoaded.value = true
  })

  return computed(() => ({
    startAt: sessData.value?.startAt.toDate() ?? new Date(),
    capacity: sessData.value?.capacity ?? 0,
    isOnline: deviceData.value.isOnline,
    isLightOn: deviceData.value.isLightOn,
    humidity: deviceData.value.humidity,
    temperature: deviceData.value.temperature,
    nozzleMode: fromSource.nozzleMode(sessData.value?.nozzleMode),
    pH: deviceData.value.pH,
    waterLevel: deviceData.value.waterLevel,
  }))
}
