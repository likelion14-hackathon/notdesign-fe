import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CenterSearchInput from '@/features/measurement/components/CenterSearchInput'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { MEASUREMENT_CENTERS } from '@/features/measurement/constants'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import TouchableItem from '@/shared/components/TouchableItem'

export default function CenterSelectPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const centers = useMemo(() => {
    const query = keyword.trim()
    if (!query) return MEASUREMENT_CENTERS

    return MEASUREMENT_CENTERS.filter(
      (center) => center.name.includes(query) || center.address.includes(query),
    )
  }, [keyword])

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title="어디서 측정하셨나요?"
      />

      <div className="mt-7.5 shrink-0 px-5">
        <CenterSearchInput value={keyword} onChange={setKeyword} />
      </div>

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
        {centers.map((center) => (
          <TouchableItem
            key={center.id}
            title={center.name}
            description={center.address}
            selected={center.id === selectedId}
            onClick={() => setSelectedId(center.id)}
          />
        ))}
      </div>

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton
          disabled={selectedId === null}
          onClick={() => navigate('/measurement/agreement')}
        >
          다음으로
        </BottomButton>
      </div>
    </div>
  )
}
