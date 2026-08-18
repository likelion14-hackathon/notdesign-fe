import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"
import personSilhouette from "@/shared/assets/icons/person.svg"

export default function DiaryPhotoCapture() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
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
        setCameraError("카메라를 사용할 수 없어요. 권한을 확인해주세요.")
      }
    }

    startCamera()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='mt-[30px] pl-5'>
        <span className='text-text-secondary text-base font-semibold whitespace-nowrap'>
          오늘의 기록
        </span>
        <p className='text-text-primary mt-[10px] text-2xl leading-[1.67] font-semibold'>
          표시선에 얼굴을 맞춰주세요
        </p>
      </div>

      <div className='mt-[99px] flex justify-center'>
        <div className='bg-primary relative flex h-[374px] w-[374px] items-center justify-center rounded-full'>
          <div className='bg-off-white flex h-[350px] w-[350px] items-center justify-center rounded-full'>
            <div className='bg-outline relative h-[334px] w-[334px] overflow-hidden rounded-full'>
              {cameraError ? (
                <img
                  src={personSilhouette}
                  alt='얼굴 위치 가이드'
                  className='absolute inset-0 h-full w-full object-contain p-9.5'
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className='absolute inset-0 h-full w-full -scale-x-100 object-cover'
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[26px] flex justify-center px-8'>
        <p className='text-text-secondary max-w-[280px] text-center text-xs'>
          {cameraError ?? "표시선에 얼굴이 인식되면 자동으로 촬영돼요"}
        </p>
      </div>

      <div className='mt-auto px-5 pb-10'>
        <BottomButton
          onClick={() => navigate("/diary/photo-capture/complete")}
        >
          촬영하기
        </BottomButton>
      </div>
    </div>
  )
}