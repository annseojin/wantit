import Link from 'next/link'

export default function Banner() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 lg:px-8 text-center md:text-left">
        <h2
          className="inline text-4xl font-bold tracking-tight sm:text-6xl
         gradient"
        >
          Want It.
        </h2>
        <p className="mt-6 text-2xl leading-8 text-gray-800 font-semibold">
          중부대학교 중고거래 서비스
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 font-bold">
          중부대학교 재학생들을 위한 중고거래 플랫폼 사이트
        </p>
      </section>

      <section className="mt-6 pt-8 text-lg leading-8 text-gray-300 text-center">
        <button className="btn-color2 justify-center p-3 border-1 rounded-lg">
          <Link
            href="/"
            className="text-white text-lg font-bold px-2 hover:text-gray-400"
          >
            앱 다운로드
          </Link>
        </button>
      </section>
    </div>
  )
}
