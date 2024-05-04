'use client'

import { useRouter } from 'next/navigation'
import Search from './search'
import Image from 'next/image'
import Link from 'next/link'

export default function Menu() {
  const router = useRouter()

  // 홈화면으로 이동
  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header className="bg-white shadow-2xl opacity-80">
      <nav
        className="mx-auto flex max-w-7xl 
        items-center justify-center py-2
        sm:justify-between lg:px-8 relative"
      >
        <div className="hidden sm:block">
          <Image
            className="h-12 w-auto rounded-md cursor-pointer"
            src="/favicon.ico"
            width={100}
            height={100}
            alt="Wantit"
            onClick={handleLogoClick}
          />
        </div>
        <menu className="flex gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/product" className="font-bold text-lg">
            전체
          </Link>
          <Link href="/product/clothes" className="text-lg">
            의류
          </Link>
          <Link href="/product/book" className="text-lg">
            교재
          </Link>
          <Link href="/product/other" className="text-lg">
            기타
          </Link>
        </menu>
        <Search />
      </nav>
    </header>
  )
}
