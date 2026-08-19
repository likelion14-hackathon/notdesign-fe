import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CenterSearchInput from '@/features/measurement/components/CenterSearchInput'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { useClinics } from '@/features/measurement/hooks/useClinics'
import { useMeasurementStore } from '@/features/measurement/store'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import TouchableItem from '@/shared/components/TouchableItem'
import { ApiError } from '@/shared/api/apiError'

export default function CenterSelectPage() {
  const navigate = useNavigate()
  const setSelectedClinicId = useMeasurementStore(
    (state) => state.setSelectedClinicId,
  )
  const [keyword, setKeyword] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data: clinics, isLoading, isError, error, refetch } = useClinics()

  const centers = useMemo(() => {
    const query = keyword.trim()
    if (!clinics) return []
    if (!query) return clinics

    return clinics.filter(
      (center) => center.name.includes(query) || center.address.includes(query),
    )
  }, [clinics, keyword])

  const handleNext = () => {
    if (selectedId === null) return
    setSelectedClinicId(selectedId)
    navigate('/measurement/agreement')
  }

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

      {isLoading && (
        <p className="text-text-secondary mt-7.5 px-5 text-[14px] font-medium">
          클리닉 목록을 불러오는 중이에요...
        </p>
      )}

      {isError && (
        <div className="mt-7.5 px-5">
          <p className="text-highlight text-[14px] font-semibold">
            {error instanceof ApiError
              ? error.message
              : '클리닉 목록을 불러오지 못했어요.'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-primary mt-2 text-[13px] font-semibold underline"
          >
            다시 시도하기
          </button>
        </div>
      )}

      {!isLoading && !isError && (
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
      )}

      <BottomBar>
        <BottomButton disabled={selectedId === null} onClick={handleNext}>
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
