const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize'

/**
 * 카카오 로그인 페이지로 리다이렉트할 URL을 만든다.
 * 사용자가 동의 후 VITE_KAKAO_REDIRECT_URI로 `code` 쿼리 파라미터와 함께 돌아온다.
 */
export function getKakaoAuthorizeUrl(): string {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI

  if (!clientId || !redirectUri) {
    throw new Error(
      '카카오 로그인 설정이 아직 안 되어 있습니다. VITE_KAKAO_REST_API_KEY / VITE_KAKAO_REDIRECT_URI를 확인해주세요.',
    )
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  })

  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`
}
