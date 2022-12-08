import type { FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'

const config: FirebaseOptions = {
  apiKey: 'AIzaSyDj7IyfiuQNd_uyk_SXXtqQTJKyh6FRBj8',
  authDomain: 'learning-project-321200.firebaseapp.com',
  databaseURL: 'https://learning-project-321200-default-rtdb.firebaseio.com',
  projectId: 'learning-project-321200',
  storageBucket: 'learning-project-321200.appspot.com',
  messagingSenderId: '729738339697',
  appId: '1:729738339697:web:3c24716ec85d42785fc2d0',
}

export default initializeApp(config)
