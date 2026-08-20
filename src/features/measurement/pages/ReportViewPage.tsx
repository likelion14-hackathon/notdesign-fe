import { useNavigate } from 'react-router-dom'
import FinalReportPage from '@/features/measurement/pages/FinalReportPage'
import SixWeekReportPage from '@/features/measurement/pages/SixWeekReportPage'
import { useLatestReport } from '@/features/report/hooks/useLatestReport'
import { useReportStore } from '@/features/report/store'
import { ApiError } from '@/shared/api/apiError'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

export default function ReportViewPage() {
  const navigate = useNavigate()
  const createdReport = useReportStore((state) => state.latestReport)
  const {
    data: latestReport,
    isLoading,
    error,
  } = useLatestReport(createdReport === null)
  const report = createdReport ?? latestReport ?? null

  if (report) {
    return report.type === 'FINAL' ? (
      <FinalReportPage report={report} />
    ) : (
      <SixWeekReportPage report={report} />
    )
  }

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-normal font-semibold tracking-[-0.3px]">
          리포트
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          내 리포트
        </h1>
      </div>

      {isLoading && (
        <p className="text-text-secondary mt-7.5 px-5 text-[14px] font-medium">
          리포트를 불러오는 중이에요...
        </p>
      )}

      {!isLoading && !error && (
        <div className="mt-7.5 flex flex-col items-center gap-4 px-5 text-center">
          <p className="text-text-secondary text-[14px] font-medium break-keep">
            아직 받은 리포트가 없어요. 리포트를 생성해보세요!
          </p>
          <div className="w-full max-w-60">
            <BottomButton
              onClick={() => navigate('/measurement/report-request')}
            >
              리포트 생성하기
            </BottomButton>
          </div>
        </div>
      )}

      {error && (
        <p className="text-highlight mt-7.5 px-5 text-[13px] font-semibold break-keep">
          {error instanceof ApiError
            ? error.message
            : '리포트를 불러오지 못했어요.'}
        </p>
      )}
    </div>
  )
}
