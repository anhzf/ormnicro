import provider from './providers/firebase-rtdb'
import type { UseDevice } from './types'

const useDevice: UseDevice = provider

export default useDevice
export * as COMPOST_PARAMETERS from './constants'
export * from './types'
