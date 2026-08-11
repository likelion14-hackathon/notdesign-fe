interface SkeletonBarProps {
  className?: string
}

/** 밝은 빛줄기가 좌→우로 스치는 애니메이션이 적용 */
export default function SkeletonBar({ className }: SkeletonBarProps) {
  return (
    <div
      className={`skeleton-shimmer h-4.25 rounded-full backdrop-blur-[2px] ${className ?? ''}`}
    />
  )
}
