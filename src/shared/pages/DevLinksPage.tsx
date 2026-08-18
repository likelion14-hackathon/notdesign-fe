import { Link } from 'react-router-dom'

const ROUTE_GROUPS: { group: string; links: { path: string; title: string }[] }[] = [
  {
    group: '홈 / 플랜 / 정보',
    links: [
      { path: '/', title: '홈' },
      { path: '/plan', title: '플랜' },
      { path: '/my', title: '정보' },
    ],
  },
  {
    group: '온보딩 / 체험',
    links: [
      { path: '/onboard', title: '온보딩' },
      { path: '/trial', title: '체험 인트로' },
      { path: '/trial/capture', title: '체험 촬영' },
      { path: '/trial/capture/complete', title: '체험 촬영 완료' },
      { path: '/trial/analyze', title: '체험 분석 중' },
      { path: '/trial/analyze/complete', title: '체험 분석 완료' },
      { path: '/trial/request', title: '체험 플랜 요청' },
      { path: '/trial/plan-generating', title: '일주일 플랜 생성 중' },
      { path: '/trial/plan-result', title: '일주일 플랜 결과' },
    ],
  },
  {
    group: '측정 / 리포트',
    links: [
      { path: '/measurement/report-request', title: '리포트 생성 요청' },
      { path: '/measurement/center-select', title: '센터 선택' },
      { path: '/measurement/agreement', title: '측정 데이터 이용 동의' },
      { path: '/measurement/processing', title: '측정 데이터 불러오는 중' },
      { path: '/measurement/result', title: '측정 결과' },
      { path: '/measurement/plan-request', title: '12주 플랜 만들기' },
      { path: '/measurement/plan-generating', title: '12주 플랜 생성 중' },
      { path: '/measurement/plan-result', title: '12주 플랜 결과' },
      { path: '/measurement/six-week-report', title: '6주차 중간 리포트' },
      { path: '/measurement/report-import-failed', title: '측정 데이터 불러오기 실패' },
      { path: '/measurement/report-generating', title: '리포트 생성 중' },
      { path: '/measurement/new-plan-result', title: '새 플랜 결과' },
      { path: '/measurement/final-report', title: '12주 최종 리포트' },
    ],
  },
  {
    group: '기록(다이어리)',
    links: [
      { path: '/diary', title: '기록 캘린더' },
      { path: '/diary/photo-select', title: '오늘의 기록 - 사진 선택' },
      { path: '/diary/photo-capture', title: '오늘의 기록 - 사진 촬영' },
      { path: '/diary/photo-capture/complete', title: '오늘의 기록 - 촬영 완료' },
      { path: '/diary/record/skin-tone', title: '오늘의 기록 - 피부 톤' },
      { path: '/diary/record/dryness', title: '오늘의 기록 - 모공' },
      { path: '/diary/record/redness', title: '오늘의 기록 - 붉은기' },
      { path: '/diary/record/checklist', title: '오늘의 기록 - 체크리스트' },
      { path: '/diary/record/diary', title: '오늘의 기록 - 일기' },
    ],
  },
  {
    group: '웰니스 지출 진단',
    links: [
      { path: '/wellness', title: '웰니스 지출 진단 인트로' },
      { path: '/wellness/procedure-cost', title: '시술 비용 입력' },
      { path: '/wellness/skincare-cost', title: '스킨케어 비용 입력' },
      { path: '/wellness/effect-perception', title: '효과 체감도' },
      { path: '/wellness/contribution-awareness', title: '기여도 인지 여부' },
      { path: '/wellness/waste-reveal', title: '낭비 비용 공개' },
      { path: '/wellness/yearly-spend-reveal', title: '연간 지출 비용 공개' },
      { path: '/wellness/monthly-avg-reveal', title: '한 달 평균 지출 비용 공개' },
      { path: '/wellness/spend-summary', title: '지출 요약' },
      { path: '/wellness/saving-intro', title: '절약 안내' },
      { path: '/wellness/plan-teaser', title: '플랜 티저' },
      { path: '/wellness/plan-teaser-spend', title: '플랜 티저 + 연간 지출 비용' },
      { path: '/wellness/plan-teaser-expand', title: '플랜 티저 확장' },
      { path: '/wellness/plan-cta', title: '플랜 시작 CTA' },
    ],
  },
]

export default function DevLinksPage() {
  return (
    <div className="min-h-screen-safe mx-auto w-full max-w-103.5 bg-white px-5 pt-[calc(env(safe-area-inset-top)+20px)] pb-[max(35px,env(safe-area-inset-bottom))]">
      <h1 className="text-xl font-bold">개발용 페이지 링크</h1>
      <p className="mt-1 text-sm text-neutral-500">
        PWA standalone 모드에서 주소창 없이 특정 화면으로 바로 이동할 때 사용하세요.
      </p>

      {ROUTE_GROUPS.map((group) => (
        <section key={group.group} className="mt-6">
          <h2 className="text-sm font-semibold text-neutral-700">{group.group}</h2>
          <div className="mt-2 flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200">
            {group.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-3 text-sm text-neutral-800 active:bg-neutral-100"
              >
                {link.title}
                <span className="ml-2 text-neutral-400">{link.path}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
