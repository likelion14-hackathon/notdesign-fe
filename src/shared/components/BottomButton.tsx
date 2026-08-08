import type { ComponentPropsWithoutRef } from 'react'

type BottomButtonProps = ComponentPropsWithoutRef<'button'>

export default function BottomButton({
  type = 'button',
  className,
  ...props
}: BottomButtonProps) {
  return (
    <button
      type={type}
      className={[
        'bg-primary flex h-14.5 w-full items-center justify-center rounded-[10px]',
        'text-off-white text-[15px] font-semibold tracking-[-0.3px]',
        'drop-shadow-[0px_0px_4.2px_rgba(115,115,115,0.25)]',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:drop-shadow-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
