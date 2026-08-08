import searchIcon from '@/shared/assets/icons/search.svg'

interface CenterSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export default function CenterSearchInput({
  value,
  onChange,
}: CenterSearchInputProps) {
  return (
    <div className="bg-box-background flex h-14 w-full items-center gap-2.5 rounded-[10px] px-5">
      <div className="relative size-3.5 shrink-0">
        <div className="absolute inset-[-5.36%]">
          <img src={searchIcon} alt="" className="block size-full max-w-none" />
        </div>
      </div>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="센터 명을 입력하세요"
        aria-label="센터 검색"
        className="text-text-primary placeholder:text-text-secondary min-w-0 flex-1 bg-transparent text-[15px] font-medium tracking-[-0.3px] outline-none"
      />
    </div>
  )
}
