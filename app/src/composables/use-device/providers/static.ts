import type { UseCompostParameters } from '../types'

export default <UseCompostParameters>(() => ref({
  startAt: new Date(2022, 8, 15),
  isOnline: true,
  isLightOn: true,
  humidity: 0.89,
  temperature: 22.5,
  nozzleMode: 'AUTO',
  pH: 7.5,
  waterLevel: 0.36,
  capacity: 81,
}))
