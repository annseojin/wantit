'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 정규표현식을 사용하여 입력된 값이 숫자인지 확인
    if (/^\d*$/.test(value)) {
      setStudentId(value)
    }
  }

  /// ***개인정보 일치 여부 서버로 요청 보내서 확인*** ///

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/파일경로', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, studentId }),
      })

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.')
      }

      const data = await response.json()
      console.log('response data:', data)

      if (data.success) {
        router.push('/forgot/find')
      } else {
        setErrorMessage('입력하신 학번과 이름이 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage(
        '서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      )
      router.push('/forgot/find')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-8 w-80">
        <Link href="/" className="text-4xl font-black mb-4 hover:text-gray-500">
          WANT IT.
        </Link>
        <p className="mb-4 font-bold text-xl">비밀번호 찾기</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              required
              placeholder="이름"
              id="name"
              name="name"
              onChange={handleNameChange}
              className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
            />
          </div>
          <input
            required
            placeholder="학번"
            id="studentId"
            name="studentId"
            value={studentId}
            maxLength={8}
            onChange={handleStudentIdChange}
            className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 btn-color2 
          duration-300 rounded-xl text-white font-bold"
          >
            확인
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default Page
