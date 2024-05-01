'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'

const Page: React.FC = () => {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')

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

  const handleSubmit = async () => {
    try {
      // 서버로 요청을 보냄
      const response = await axios.post('/api/find-password', {
        name,
        studentId,
      })

      // 테스트
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error)
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
              placeholder="이름"
              onChange={handleNameChange}
              className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
            />
          </div>
          <input
            placeholder="학번"
            onChange={handleStudentIdChange}
            className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gray-500 hover:bg-gray-600 
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
