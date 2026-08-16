import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CenterSearchInput from '@/features/measurement/components/CenterSearchInput'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { MEASUREMENT_CENTERS } from '@/features/measurement/constants'
import BottomBar from '@/shared/components/BottomBar'
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
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title="어디서 측정하셨나요?"
      />

      <div className="mt-7.5 shrink-0 px-5">
        <CenterSearchInput value={keyword} onChange={setKeyword} />
      </div>

      <div className="mt-5">
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

      <BottomBar>
        <BottomButton
          disabled={selectedId === null}
          onClick={() => navigate('/measurement/agreement')}
        >
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
