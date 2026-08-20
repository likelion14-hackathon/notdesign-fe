export interface SigninRequest {
  email: string
  password: string
}

export interface KakaoSigninRequest {
  /** 카카오 인가 코드(authorization code) */
  code: string
}

export interface SigninResult {
  accessToken: string
  refreshToken: string
  name?: string | null
  email?: string | null
}
