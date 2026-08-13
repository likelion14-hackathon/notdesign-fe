export interface OnboardingSlide {
  id: number
  title: string
  description: string
}

export const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: '피부에 투자한\n나의 노력이 헛되지 않도록',
    description:
      ' 내 피부에 투자한 수많은 노력 중에서 ‘진짜’ 효과가 있었던 행동은 무엇이었는지, 알고 계신가요?',
  },
  {
    id: 2,
    title: "'진짜' 효과가 있었던 행동을\n객관적인 지표로 분석해드려요",
    description:
      '화장품, 시술, 영양제, 생활 습관 개선의 노력들 중 도움이 됐던 행동들과 그렇지 않은 행동을 알 수 있다면 더 빠른 효과를 불러올 수 있을 거예요',
  },
  {
    id: 3,
    title: '나만의 12주 플랜으로\n비용은 줄이고, 효과는 높혀요',
    description:
      '피부에 도움이 된 행동들의 기여도를 추정하여 오직 나만을 위한 플랜을 만들어드려요',
  },
]
