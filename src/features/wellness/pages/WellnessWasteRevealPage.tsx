import NumberFlow from '@number-flow/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WELLNESS_WASTE_REVEAL } from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult } from '@/features/wellness/utils'
import Logo from '@/shared/components/Logo'

const AUTO_ADVANCE_MS = 2400

export default function WellnessWasteRevealPage() {
  const navigate = useNavigate()
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { wasteCost } = useMemo(
    () =>
      calculateWellnessResult({
        procedureCost,
        skincareCost,
        effectPerceptionId,
        contributionAwarenessId,
      }),
    [procedureCost, skincareCost, effectPerceptionId, contributionAwarenessId],
  )

  const [displayWasteCost, setDisplayWasteCost] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayWasteCost(Math.round(wasteCost))
    })
    return () => cancelAnimationFrame(id)
  }, [wasteCost])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/yearly-spend-reveal', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col items-center gap-15.5 px-13.5 pt-7.5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_WASTE_REVEAL.userName}
          {WELLNESS_WASTE_REVEAL.title[0]}
          <br />
          {WELLNESS_WASTE_REVEAL.title[1]}
        </h1>

        <div className="flex flex-col items-center gap-3.75 text-center">
          <p className="text-text-secondary text-[14px] font-medium tracking-[-0.28px]">
            {WELLNESS_WASTE_REVEAL.wasteCostLabel}
          </p>
          <p className="text-primary text-[28px] font-semibold tracking-[-0.56px]">
            <NumberFlow value={displayWasteCost} suffix="원" />
          </p>
        </div>
      </div>
    </div>
  )
}
