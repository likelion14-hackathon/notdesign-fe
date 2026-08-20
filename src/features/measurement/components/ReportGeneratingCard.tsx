import { useUserName } from '@/features/auth/useUserName'
import SkeletonBar from '@/shared/components/SkeletonBar'
import SkeletonParagraphBox from '@/shared/components/SkeletonParagraphBox'
import SkeletonProfileRow from '@/shared/components/SkeletonProfileRow'

export default function ReportGeneratingCard() {
  const userName = useUserName()

  return (
    <div className="border-outline bg-box-background mx-auto w-full max-w-81.75 rounded-[10px] border px-5 pt-6.25 pb-7.25">
      <SkeletonProfileRow name={userName} />

      <div className="mt-7.5">
        <SkeletonBar />
        <SkeletonBar className="mt-2.25 w-[95%]" />
      </div>

      <div className="mt-5">
        <SkeletonParagraphBox />
      </div>

      <div className="mt-2.75">
        <SkeletonParagraphBox />
      </div>
    </div>
  )
}
