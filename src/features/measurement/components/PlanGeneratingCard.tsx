import { MEASUREMENT_RESULT } from '@/features/measurement/constants'
import { useAuthStore } from '@/features/auth/store'
import SkeletonBar from '@/shared/components/SkeletonBar'
import SkeletonParagraphBox from '@/shared/components/SkeletonParagraphBox'
import SkeletonProfileRow from '@/shared/components/SkeletonProfileRow'

export default function PlanGeneratingCard() {
  const userName = useAuthStore((state) => state.name)

  return (
    <div className="border-outline bg-box-background mx-auto w-full max-w-81.75 rounded-[10px] border px-5 pt-6.25 pb-7.25">
      <SkeletonProfileRow name={userName ?? MEASUREMENT_RESULT.name} />

      <SkeletonBar className="mt-7.25" />
      <SkeletonBar className="mt-2.25 w-[95.1%]" />

      <div className="mt-6.5">
        <SkeletonParagraphBox />
      </div>
      <div className="mt-2.5">
        <SkeletonParagraphBox />
      </div>
    </div>
  )
}
