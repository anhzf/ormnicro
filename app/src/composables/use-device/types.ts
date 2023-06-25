import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import type { MONITORING_TYPES, NOZZLE_MODES } from './constants'

export type NozzleMode = typeof NOZZLE_MODES[number]

export type MonitoringType = typeof MONITORING_TYPES[number]

export interface Device {
  id: string
  name?: string
  labels: string[]
  activeDate: Date
  activeSessions: Partial<Record<MonitoringType, string>>
}

export interface UserSavedDevice {
  name: string
  [k: string]: unknown
}

export interface DeviceWithUserSavedData extends Device {
  fromUser?: UserSavedDevice
}

export interface Session {
  capacity: number
  isNozzleManual: boolean
  startAt: Date
  stoppedAt: Date | null
  type: MonitoringType
}

export interface GetDevice {
  (id: MaybeRef<string>): Ref<DeviceWithUserSavedData | null>
}

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
  _isReady?: boolean
  _hasSession?: boolean
}

export interface UseCompostParameters {
  (deviceId: MaybeRef<string>): Ref<CompostParameters | null>
}

export interface StartCompostMonitoring {
  (deviceId: string): Promise<void>
}

export interface StopCompostMonitoring {
  (deviceId: string): Promise<void>
}

export interface MaggotParameters {
  startAt: Date
  isOnline: boolean
  isLightOn: boolean
  /** 0 - 1 */
  humidity: number
  /** Celsius */
  temperature: number
  nozzleMode: NozzleMode
  lumix: number
  _isReady?: boolean
  _hasSession?: boolean
}

export interface UseMaggotParameters {
  (deviceId: MaybeRef<string>): Ref<MaggotParameters | null>
}

export interface StartMaggotMonitoring {
  (deviceId: string): Promise<void>
}

export interface StopMaggotMonitoring {
  (deviceId: string): Promise<void>
}

export interface UseDevice extends GetDevice {
  compostParameters: UseCompostParameters
  startCompostMonitoring: StartCompostMonitoring
  stopCompostMonitoring: StopCompostMonitoring
  maggotParameters: UseMaggotParameters
  startMaggotMonitoring: StartMaggotMonitoring
  stopMaggotMonitoring: StopMaggotMonitoring
  current: () => Ref<DeviceWithUserSavedData | null>
}
