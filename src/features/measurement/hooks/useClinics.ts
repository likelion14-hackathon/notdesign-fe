import { useQuery } from '@tanstack/react-query'
import { getClinics } from '@/features/measurement/api/clinics'

export function useClinics() {
  return useQuery({
    queryKey: ['clinics'],
    queryFn: getClinics,
    staleTime: 30 * 60 * 1000,
  })
}
