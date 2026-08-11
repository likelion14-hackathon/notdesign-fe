import proofLogoDark from '@/shared/assets/icons/proof-logo-dark.svg'

export default function Logo() {
  return (
    <header className="bg-off-white h-17.75 shrink-0">
      <img
        src={proofLogoDark}
        alt="Proof"
        className="mt-6.5 ml-5.25 block h-4 w-12.5"
      />
    </header>
  )
}
