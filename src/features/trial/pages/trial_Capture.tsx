import { useEffect, useRef, useState } from 'react'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import personSilhouette from '@/shared/assets/icons/person.svg'
import { useNavigate } from 'react-router-dom'

function Trial_Capture() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        setCameraError('카메라를 사용할 수 없어요. 권한을 확인해주세요.')
      }
    }

    startCamera()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return (
    <div className="bg-off-white relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden">
      <Logo />

      {/* 제목 영역 */}
      <div className="mt-7.5 pl-5">
        <div className="h-4.5 w-16">
          <span className="text-text-secondary font-sans text-base font-semibold whitespace-nowrap">
            체험해보기
          </span>
        </div>

        <div className="mt-2.5 h-10 w-69">
          <p className="text-text-primary font-sans text-2xl leading-[1.67] font-semibold">
            표시선에 얼굴을 맞춰주세요
          </p>
        </div>
      </div>

      {/* 원형 가이드 영역 */}
      <div className="mt-24.75 flex justify-center">
        <div className="bg-primary relative flex h-93.5 w-93.5 items-center justify-center rounded-full">
          <div className="bg-off-white flex h-87.5 w-87.5 items-center justify-center rounded-full">
            <div className="bg-outline relative h-83.5 w-83.5 overflow-hidden rounded-full">
              {cameraError ? (
                <img
                  src={personSilhouette}
                  alt="얼굴 위치 가이드"
                  className="absolute inset-0 h-full w-full object-contain p-9.5"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mt-6.5 flex justify-center px-8">
        <p className="text-text-secondary max-w-70 text-center font-sans text-xs">
          {cameraError ?? '표시선에 얼굴이 인식되면 자동으로 촬영돼요'}
        </p>
      </div>

      {/* 촬영하기 버튼 */}
      <div className="mt-auto px-5 pb-10">
        <BottomButton onClick={() => navigate('/trial/capture/complete')}>
          촬영하기
        </BottomButton>
      </div>
    </div>
  )
}

export default Trial_Capture