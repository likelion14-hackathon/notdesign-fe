import type { ReactNode } from 'react'

interface WellnessSpendCardProps {
  icon: string
  iconClassName: string
  label: string
  value: ReactNode
  bgClassName?: string
}

export default function WellnessSpendCard({
  icon,
  iconClassName,
  label,
  value,
  bgClassName = 'bg-[#eaeee3]',
}: WellnessSpendCardProps) {
  return (
    <div
      className={`flex h-26.25 w-full items-center gap-7.25 rounded-[30px] pl-7.25 ${bgClassName}`}
    >
      <div className="flex size-16.75 shrink-0 items-center justify-center">
        <img src={icon} alt="" className={iconClassName} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-text-secondary text-[14px] font-medium tracking-[-0.28px]">
          {label}
        </p>
        <p className="text-text-primary text-[24px] font-semibold tracking-[-0.48px]">
          {value}
        </p>
      </div>
    </div>
  )
}
