import { useAuth, useFirestore } from '@vueuse/firebase'
import type { DocumentReference } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { auth, db } from '~/services/firebase'

interface SavedDevice {
  name: string
  [k: string]: unknown
}

interface UserExtendedData {
  savedDevices: Record<string, SavedDevice>
}

const useUser = () => {
  const { user } = useAuth(auth())
  const docRef = computed(() => doc(db(), 'Users', user.value.uid) as DocumentReference<UserExtendedData>)
  const extendedData = useFirestore(docRef, {
    savedDevices: {},
  })

  return {
    user,
    extended: extendedData,
    $ref: docRef,
  }
}

export default useUser
