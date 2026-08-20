import { useEffect, useRef, useState } from 'react'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import personSilhouette from '@/shared/assets/icons/person.svg'
import { useNavigate } from 'react-router-dom'
import { analyzeDiaryImage } from '@/features/analyze/api'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { ApiError } from '@/shared/api/apiError'

const ANALYZE_ERROR_MESSAGE: Partial<Record<string, string>> = {
  C5003: '이미지를 업로드하지 못했어요. 다시 촬영해주세요.',
  C502: '지금은 분석 서버 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요.',
}

function captureVideoFrame(video: HTMLVideoElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('이미지를 만들 수 없어요.'))
      return
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('이미지를 만들 수 없어요.')),
      'image/jpeg',
      0.92,
    )
  })
}

function Trial_Capture() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  useScrollLock()

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

  const handleCapture = async () => {
    if (isUploading || cameraError || !videoRef.current) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const frame = await captureVideoFrame(videoRef.current)
      const { requestId } = await analyzeDiaryImage(frame)
      navigate('/trial/capture/complete', { state: { requestId } })
    } catch (error) {
      const code = error instanceof ApiError ? error.code : null
      const fallback =
        error instanceof Error
          ? error.message
          : '사진 업로드에 실패했어요. 다시 시도해주세요.'
      setUploadError((code && ANALYZE_ERROR_MESSAGE[code]) ?? fallback)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-off-white fixed inset-0 mx-auto flex w-full max-w-md flex-col overflow-hidden">
      <Logo />

      {/* 제목 영역 */}
      <div className="shrink-0 pl-5">
        <span className="text-text-secondary font-sans text-base font-semibold whitespace-nowrap">
          체험해보기
        </span>

        <p className="text-text-primary mt-2.5 font-sans text-2xl leading-[1.67] font-semibold">
          표시선에 얼굴을 맞춰주세요
        </p>
      </div>

      {/* 원형 가이드 영역 */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-5">
        <div className="bg-primary relative flex aspect-square w-full max-w-93.5 items-center justify-center rounded-full">
          <div className="bg-off-white flex h-[93.6%] w-[93.6%] items-center justify-center rounded-full">
            <div className="bg-outline relative h-[95.4%] w-[95.4%] overflow-hidden rounded-full">
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
      <div className="flex shrink-0 justify-center px-8">
        <p
          className={`max-w-70 text-center font-sans text-xs ${uploadError ? 'text-red-500' : 'text-text-secondary'}`}
        >
          {uploadError ??
            cameraError ??
            '표시선에 얼굴이 인식되면 자동으로 촬영돼요'}
        </p>
      </div>

      {/* 촬영하기 버튼 */}
      <div className="shrink-0 px-5 pt-6.5 pb-[max(40px,env(safe-area-inset-bottom))]">
        <BottomButton
          onClick={handleCapture}
          disabled={isUploading || Boolean(cameraError)}
        >
          {isUploading ? '분석 요청 중...' : '촬영하기'}
        </BottomButton>
      </div>
    </div>
  )
}

export default Trial_Capture
