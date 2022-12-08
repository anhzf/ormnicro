import provider from './providers/firebase-rtdb'
import type { UseCompostParameters } from './types'

const useCompostParameters: UseCompostParameters = provider

export default useCompostParameters
export * as COMPOST_PARAMETERS from './constants'
export * from './types'
