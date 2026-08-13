import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import BottomButton from "@/shared/components/BottomButton"
import { RECORDED_DATES } from "@/features/diary/data/diaryData"
import recordIcon from "@/shared/assets/icons/record.svg"

interface RecordStatusCardProps {
  selectedDate: Date
}

export default function RecordStatusCard({
  selectedDate,
}: RecordStatusCardProps) {
  const navigate = useNavigate()

  
  const recorded = RECORDED_DATES.includes(
    format(selectedDate, "yyyy-MM-dd"),
  )

  return (
    <div className='mx-auto w-[335px]'>
      <div className='border-outline bg-box-background flex h-[230px] w-full flex-col items-center justify-center rounded-[16px] border text-center'>
        {recorded ? (
          <p className='text-text-primary text-base font-semibold'>
            오늘의 기록을 확인해보세요
          </p>
        ) : (
          <div className='flex h-[135px] w-[161px] flex-col items-center justify-center gap-[23px]'>
            <img src={recordIcon} alt='' className='size-[52px]' />
            <p className='text-text-primary w-[161px] text-base font-semibold'>
              아직 기록하지 않았어요
            </p>
            <p className='text-text-secondary text-sm leading-4 whitespace-nowrap'>
              오늘의 하루를 기록해 볼까요?
            </p>
          </div>
        )}
      </div>

      {!recorded && (
        <div className='mt-4'>
          <BottomButton onClick={() => navigate("/diary/photo-select")}>
            기록하기
          </BottomButton>
        </div>
      )}
    </div>
  )
}