import firebaseJson from '~/../../firebase.json'

export default Object.freeze({
  firebase: {
    config: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG),
    // useEmulator: false,
    useEmulator: import.meta.env.PROD ? false : import.meta.env.VITE_FIREBASE_EMULATOR === 'true',
    emulatorPort: {
      auth: firebaseJson.emulators.auth.port,
      database: firebaseJson.emulators.database.port,
      firestore: firebaseJson.emulators.firestore.port,
      functions: firebaseJson.emulators.functions.port,
      storage: firebaseJson.emulators.storage.port,
    },
  },
  supportEmail: 'akhdanzaim53@gmail.com',
})
