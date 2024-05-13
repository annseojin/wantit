'use client'

import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { ModalProps } from '@/hooks/hooks'

// 모달창 고정
const Login: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSignupClick = () => {
    onClose()
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
        onClick={onClose}
      ></div>
      {/* 로그인 모달창 */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isOpen ? '' : 'hidden'
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="p-4 w-full max-w-md max-h-full py-40 mx-auto">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                로그인 화면
              </h3>

              {/* 닫기( X ) 버튼 */}
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="authentication-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* 모달 내용 */}

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="studentId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    학번
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    id="studentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="9xxxxxxx"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        style={{ accentColor: '#497649' }}
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      자동 로그인
                    </label>
                  </div>
                  <Link
                    onClick={handleSignupClick}
                    href="/forgot"
                    className="text-sm text-green-800 hover:underline"
                  >
                    비밀번호를 잃어버리셨나요?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white btn-color1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  로그인
                </button>

                <div>
                  <button
                    type="submit"
                    className="justify-center flex
                    w-full text-white btn-color2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <img
                      src="/everytime.png"
                      alt="에브리타임"
                      className="w-4 h-auto mr-2"
                    />
                    에브리타임으로 로그인
                  </button>
                </div>

                <article className="flex justify-between text-sm font-medium text-gray-500">
                  <div>아직 회원가입을 안 하셨나요?</div>
                  <div>
                    <Link
                      onClick={handleSignupClick}
                      href="/signup"
                      className="text-gray-500 hover:underline"
                    >
                      회원가입
                    </Link>
                  </div>
                </article>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
