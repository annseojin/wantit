'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page: React.FC = () => {
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // 비밀번호 유효성
  const validatePassword = () => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/
    if (!regex.test(password1)) {
      return '비밀번호는 최소 영문자, 숫자, 특수문자 각 1자 이상, 총 10자 이상이어야 합니다.'
    }
    if (password1 !== password2) {
      return '비밀번호가 일치하지 않습니다.'
    }
    return ''
  }

  // 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errorMsg = validatePassword()
    if (errorMsg) {
      setError(errorMsg)
    } else {
      setError('')
      router.push('/')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-8 w-80">
        <Link href="/" className="text-4xl font-black mb-4 hover:text-gray-500">
          WANT IT.
        </Link>
        <p className="mb-4 font-bold text-xl">비밀번호 변경</p>

        {error && (
          <div className="mb-4 text-red-500 font-bold text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-4">
            <input
              required
              placeholder="새 비밀번호"
              id="password1"
              name="password1"
              onChange={(e) => setPassword1(e.target.value)}
              className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
            />
          </div>
          <input
            required
            placeholder="비밀번호 확인"
            type="password"
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 btn-color2 
        duration-300 rounded-xl text-white font-bold"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
