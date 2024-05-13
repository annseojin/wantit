'use client'

import Link from 'next/link'
import React from 'react'

const Page: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-8 w-80">
        <Link href="/" className="text-4xl font-black mb-4 hover:text-gray-500">
          WANT IT.
        </Link>
        <p className="mb-4 font-bold text-xl">비밀번호 찾기</p>
        <p>
          회원님의 비밀번호는 <span className="text-red-500">qwer1234!@</span>{' '}
          입니다.
        </p>
        <form className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-2 btn-color2 
        duration-300 rounded-xl text-white font-bold"
          >
            확인
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Page
