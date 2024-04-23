import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function RightSidebar() {
  return (
    <div className="w-1/4 bg-white rounded-lg p-4 border shadow">
      <div className="pb-10 rounded-full w-20 h-20 mx-auto bg-gray-200">
        <Link href="/mypage" className="text-lg font-bold">
          <Image
            width={100}
            height={100}
            className="mt-10 rounded-full w-20 h-20 mx-auto"
            src="/favicon.ico"
            alt="프로필사진"
          />
        </Link>
      </div>

      <div className="text-center pt-5">
        <Link href="/mypage" className="text-lg font-bold">
          이름
        </Link>
      </div>
    </div>
  )
}
