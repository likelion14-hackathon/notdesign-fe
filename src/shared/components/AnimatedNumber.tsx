import NumberFlow, { type Format } from '@number-flow/react'
import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  format?: Format
  className?: string
}

/** 마운트 직후 0에서 값까지, 이후에는 이전 값에서 새 값까지 굴러가며 바뀌는 숫자 */
export default function AnimatedNumber({
  value,
  prefix,
  suffix,
  format,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setDisplayValue(value))
    return () => cancelAnimationFrame(id)
  }, [value])

  return (
    <NumberFlow
      value={displayValue}
      prefix={prefix}
      suffix={suffix}
      format={format}
      className={className}
    />
  )
}
