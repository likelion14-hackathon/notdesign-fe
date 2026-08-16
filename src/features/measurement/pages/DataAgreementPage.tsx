import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import {
  MEASUREMENT_AGREEMENT_SECTIONS,
  MEASUREMENT_AGREEMENT_TITLE,
} from '@/features/measurement/constants'
import BottomBar from '@/shared/components/BottomBar'
import Logo from '@/shared/components/Logo'

const ACTION_BUTTON =
  'flex h-14.5 items-center justify-center rounded-[10px] text-[15px] font-semibold tracking-[-0.3px] text-off-white shadow-[0px_0px_8.4px_0px_rgba(115,115,115,0.25)]'

export default function DataAgreementPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        backTo="/measurement/center-select"
        title={
          <>
            측정 데이터 조회 및 분석 약관에
            <br />
            동의가 필요해요
          </>
        }
      />

      <div className="mt-10 px-5">
        <h2 className="text-text-primary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {MEASUREMENT_AGREEMENT_TITLE}
        </h2>

        <div className="text-text-secondary mt-2.25 space-y-6.25 text-[15px] leading-6.25 font-semibold tracking-[-0.3px]">
          {MEASUREMENT_AGREEMENT_SECTIONS.map((section) => (
            <section key={section.heading}>
              <p>{section.heading}</p>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="list-disc ps-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <BottomBar>
        <div className="flex gap-2.75">
          <button
            type="button"
            onClick={() => navigate('/measurement/center-select')}
            className={`${ACTION_BUTTON} bg-dark grow-153 basis-0`}
          >
            거절하기
          </button>
          <button
            type="button"
            onClick={() => navigate('/measurement/processing')}
            className={`${ACTION_BUTTON} bg-primary grow-210 basis-0`}
          >
            수락하기
          </button>
        </div>
      </BottomBar>
    </div>
  )
}
