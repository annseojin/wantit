import Banner from '@/components/banner'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="py-24 banner-color">
        <Banner />
      </div>
      <main className="bg-white">
        <section className="max-w-3xl mx-auto py-8 min-h-dvh">
          <h1 className="font-black text-4xl py-16">중고거래 시작하기</h1>
          <div className="flex justify-between">
            <div className="flex-1">
              <Link href="/product" className="text-xl font-bold">
                상품 구경하기{' '}
                <Image
                  src="/arrow.png"
                  alt="바로가기"
                  width={16}
                  height={16}
                  className="inline"
                />
              </Link>
              <div className="py-4">필요한 물건들이 있나 확인해 보세요.</div>
              <div className="w-56 h-60">
                <Image
                  className="rounded-lg"
                  src="/trade1.jpg"
                  alt="거래"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="flex-1">
              <Link href="/writing" className="text-xl font-bold">
                상품 판매 등록하기{' '}
                <Image
                  src="/arrow.png"
                  alt="바로가기"
                  width={16}
                  height={16}
                  className="inline"
                />
              </Link>

              <div className="py-4">안 쓰는 물건들을 팔아보세요.</div>
              <div className="w-56 h-60">
                <Image
                  className="rounded-lg"
                  src="/trade2.jpg"
                  alt="거래"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
