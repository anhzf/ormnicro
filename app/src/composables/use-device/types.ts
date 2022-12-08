import type { Ref } from 'vue'
import type { NOZZLE_MODES } from './constants'

export type NozzleMode = typeof NOZZLE_MODES[number]

export interface CompostParameters {
  startAt: Date
  isOnline: boolean
  isLightOn: boolean
  /** 0 - 1 */
  humidity: number
  /** Celsius */
  temperature: number
  nozzleMode: NozzleMode
  pH: number
  /** 0 - 1 */
  waterLevel: number
  /** In Liters */
  capacity: number
}

export interface UseCompostParameters {
  (deviceId: string): Ref<CompostParameters | null>
}
