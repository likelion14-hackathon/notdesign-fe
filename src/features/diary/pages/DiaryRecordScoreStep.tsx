import { useNavigate, useParams } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"
import ScoreSlider from "@/features/diary/components/ScoreSlider"
import { useDiaryStore } from "@/features/diary/data/store"

const STEPS = {
  "skin-tone": {
    title: "오늘 피부 톤은 어땠나요?",
    label: "피부 톤 점수",
    next: "/diary/record/dryness",
    field: "skinTone",
  },
  dryness: {
    title: "오늘 모공이 많이 눈에 띄었나요?",
    label: "모공 점수",
    next: "/diary/record/redness",
    field: "dryness",
  },
  redness: {
    title: "오늘 피부의 붉은기는 어땠나요?",
    label: "붉은기 점수",
    next: "/diary/record/checklist",
    field: "redness",
  },
} as const

export default function DiaryRecordScoreStep() {
  const navigate = useNavigate()
  const { step } = useParams<{ step: string }>()
  const skinTone = useDiaryStore((state) => state.skinTone)
  const dryness = useDiaryStore((state) => state.dryness)
  const redness = useDiaryStore((state) => state.redness)
  const setSkinTone = useDiaryStore((state) => state.setSkinTone)
  const setDryness = useDiaryStore((state) => state.setDryness)
  const setRedness = useDiaryStore((state) => state.setRedness)

  const config = step ? STEPS[step as keyof typeof STEPS] : undefined

  if (!config) {
    return null
  }

  const valueMap = { skinTone, dryness, redness }
  const setterMap = {
    skinTone: setSkinTone,
    dryness: setDryness,
    redness: setRedness,
  }
  const value = valueMap[config.field]
  const onChange = setterMap[config.field]

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='px-5 pt-7.5'>
        <p className='text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]'>
          오늘의 기록
        </p>
        <h1 className='text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep'>
          {config.title}
        </h1>

        <div className='mt-20'>
          <ScoreSlider value={value} onChange={onChange} label={config.label} />
        </div>
      </div>

      <div className='min-h-0 flex-1' />

      <div className='shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]'>
        <BottomButton onClick={() => navigate(config.next)}>
          다음으로
        </BottomButton>
      </div>
    </div>
  )
}