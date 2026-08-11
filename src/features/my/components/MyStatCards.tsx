import { MY_STATS } from '@/features/my/constants'

export default function MyStatCards() {
  const { recordDays, averageRate } = MY_STATS

  return (
    <div className="flex gap-4">
      {[recordDays, averageRate].map((stat) => (
        <div
          key={stat.label}
          className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-5.75 pb-5.75"
        >
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {stat.label}
          </p>
          <p className="text-text-primary mt-2.75 text-[24px] leading-6 font-semibold tracking-[-0.48px]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
