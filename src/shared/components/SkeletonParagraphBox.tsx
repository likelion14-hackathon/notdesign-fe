import SkeletonBar from '@/shared/components/SkeletonBar'

export default function SkeletonParagraphBox() {
  return (
    <div className="border-outline bg-off-white rounded-[10px] border px-2.5 py-4.25">
      <SkeletonBar />
      <SkeletonBar className="mt-2.25 w-[94.4%]" />
      <SkeletonBar className="mt-2.25 w-[30%]" />
    </div>
  )
}
