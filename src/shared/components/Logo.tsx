import proofLogoDark from '@/shared/assets/icons/proof-logo-dark.svg'

export default function Logo() {
  return (
    <header className="bg-off-white shrink-0 pt-[env(safe-area-inset-top)] pb-12 md:pt-6.5">
      <img
        src={proofLogoDark}
        alt="Proof"
        className="ml-5.25 block h-4 w-12.5"
      />
    </header>
  )
}
