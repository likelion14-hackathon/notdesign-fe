import { useAuthStore } from '@/features/auth/store'

export const FALLBACK_USER_NAME = '회원'

function emailLocalPart(email: string | null): string | null {
  if (!email) return null
  const localPart = email.split('@')[0]?.trim()
  return localPart ? localPart : null
}

export function useUserName(): string {
  const name = useAuthStore((state) => state.name)
  const email = useAuthStore((state) => state.email)

  return name ?? emailLocalPart(email) ?? FALLBACK_USER_NAME
}

export function useUserEmail(): string | null {
  return useAuthStore((state) => state.email)
}
