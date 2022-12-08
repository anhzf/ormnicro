import { useRTDB } from '@vueuse/firebase'
import { getDatabase, ref } from 'firebase/database'
import type { NozzleMode, UseCompostParameters } from '../types'
import firebase from '~/services/firebase'

interface Source {
  /** In miliseconds */
  startAt: number
  isOnline: boolean
  isLightOn: boolean
  humidity: number
  temperature: number
  /** 0: auto, 1: manual */
  nozzleMode: number
  pH: number
  waterLevel: number
  capacity: number
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

const db = getDatabase(firebase)

export default <UseCompostParameters>((deviceId) => {
  const dbRef = ref(db, `/ormnicro_devices/${deviceId}`)
  const data = useRTDB<Source>(dbRef)

  return computed(() => data.value && ({
    ...data.value,
    startAt: new Date(data.value.startAt),
    nozzleMode: fromSource.nozzleMode(data.value.nozzleMode),
  }))
})
