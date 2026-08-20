/**
 * 홈 화면 데이터.
 * 실제 API가 붙기 전까지 사용하는 임시 데이터
 */
export const HOME_SUMMARY = {
  headline: '지금 12주 사이클이 진행 중이에요!',
  todayAction: {
    subtitle: '{name}님, 잊지 않으셨죠?',
    title: '오늘의 실천을 기록하세요!',
  },
  todayActionDone: {
    subtitle: '오늘도 수고하셨어요',
    title: '오늘 기록을 완료했어요!',
  },
  cycle: {
    caption: '6주차 중간 측정까지',
    remaining: '9일 남음',
    weekLabel: '5주차 / 12주차',
    percentage: 42,
    reservation: {
      status: '예약 됨',
      dateTime: '8월 6일 (목) 10:30',
      centerName: '암레드 안티에이징 센터',
    },
  },
  importPrompt: {
    title: '이미 측정하셨나요?',
    description:
      '계획한 예정보다 일찍 측정했다면, 결과를 바로 불러와 리포트를 열 수 있어요. 아래 버튼을 눌러 기록을 불러오세요.',
    buttonLabel: '측정 결과 불러오기',
  },
} as const
