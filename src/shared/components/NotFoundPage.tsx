import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-neutral-500">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-violet-600 hover:underline">
        홈으로 돌아가기
      </Link>
    </section>
  )
}
