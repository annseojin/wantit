import Link from 'next/link'

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

export default function Banner() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 lg:px-8 text-center md:text-left">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Want It.
        </h2>
        <p className="mt-6 text-2xl leading-8 text-gray-300">
          중부대학교 중고거래
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">서비스 설명란</p>
      </section>

      <section className="mt-6 pt-8 text-lg leading-8 text-gray-300 text-center">
        <button className="bg-gray-800 hover:bg-gray-900 justify-center p-3 border-1 rounded-lg">
          <Link
            href="/product"
            className="text-white text-lg font-bold px-2 hover:text-gray-400"
          >
            앱 다운로드
          </Link>
        </button>
      </section>
    </div>
  )
}
