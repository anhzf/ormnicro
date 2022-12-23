import { useAuth, useFirestore } from '@vueuse/firebase'
import { doc } from 'firebase/firestore'
import { auth, db } from '~/services/firebase'

interface UserExtendedData {
  savedDevices: Record<string, { label: string; [k: string]: unknown }>
}

const useUser = () => {
  const { user } = useAuth(auth())
  const docRef = computed(() => doc(db(), 'Users', user.value.uid))
  const extendedData = useFirestore(docRef, <UserExtendedData>{
    savedDevices: {},
  }, { autoDispose: false })

  return {
    user,
    extended: extendedData,
    $ref: docRef,
  }
}

export default useUser
