import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store'
import { getMyInfo } from '@/features/user/api'

let requestedForToken: string | null = null

export function useSyncUserInfo() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const name = useAuthStore((state) => state.name)
  const setUserInfo = useAuthStore((state) => state.setUserInfo)

  useEffect(() => {
    if (!accessToken || name || requestedForToken === accessToken) return

    requestedForToken = accessToken
    getMyInfo()
      .then((user) => setUserInfo({ email: user.email, name: user.name }))
      .catch(() => undefined)
  }, [accessToken, name, setUserInfo])
}
