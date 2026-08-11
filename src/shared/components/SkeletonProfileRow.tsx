import SkeletonBar from '@/shared/components/SkeletonBar'

interface SkeletonProfileRowProps {
  name: string
}

/** 아바타 + 이름 + 자리표시자 바 2줄. 로딩 카드들의 상단 프로필 영역에 공통으로 씀 */
export default function SkeletonProfileRow({ name }: SkeletonProfileRowProps) {
  return (
    <div className="flex gap-2.5">
      <div className="bg-primary size-7.5 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <p className="text-text-primary mt-1.5 text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {name}
        </p>
        <SkeletonBar className="mt-2 w-[45.7%]" />
        <SkeletonBar className="mt-0.75 w-[34.4%]" />
      </div>
    </div>
  )
}
