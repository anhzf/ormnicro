import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectDatabaseEmulator, getDatabase } from 'firebase/database'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import config from '~/config'
import { singleton } from '~/utils/function'

const app = initializeApp(config.firebase.config)

const auth = singleton(() => {
  const instance = getAuth(app)

  if (config.firebase.useEmulator)
    connectAuthEmulator(instance, `http://localhost:${config.firebase.emulatorPort.auth}`)

  return instance
})

const rtdb = singleton(() => {
  const instance = getDatabase(app)

  if (config.firebase.useEmulator)
    connectDatabaseEmulator(instance, 'localhost', config.firebase.emulatorPort.database)

  return instance
})

const db = singleton(() => {
  const instance = getFirestore(app)

  if (config.firebase.useEmulator)
    connectFirestoreEmulator(instance, 'localhost', config.firebase.emulatorPort.firestore)

  return instance
})

export {
  app as default,
  auth,
  rtdb,
  db,
}

