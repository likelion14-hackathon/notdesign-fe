interface MaskIconProps {
  src: string
  className?: string
}

export default function MaskIcon({ src, className }: MaskIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 ${className ?? ''}`}
      style={{
        // data URI에 #·따옴표가 섞여 있어 url()을 따옴표로 감싸야 함.
        maskImage: `url("${src}")`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url("${src}")`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
