'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page: React.FC = () => {
  const [popovers, setPopovers] = useState<{ [key: string]: boolean }>({
    agreePopover: false,
    infoPopover: false,
    pwdPopover: false,
    pwdMatchPopover: false,
    telPopover: false,
  })
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value.replace(/\D/g, '') // 숫자만 남기기
    const formattedInput: string = formatPhoneNumber(input) // 전화번호 형식으로 변환
    setPhoneNumber(formattedInput)
  }

  // 전화번호 중간에 "-" 추가
  const formatPhoneNumber = (input: string): string => {
    if (input.length > 3) {
      input = input.slice(0, 3) + '-' + input.slice(3)
    }
    if (input.length > 8) {
      input = input.slice(0, 8) + '-' + input.slice(8)
    }
    return input
  }

  // 팝오버 함수 36~115줄
  const handleSignup = () => {
    const isInfoComplete = [
      'first-name',
      'last-name',
      'id',
      'password1',
      'password2',
      'tel',
    ].every(
      (fieldName) =>
        !!(document.getElementById(fieldName) as HTMLInputElement)?.value
    )

    const isAgreeTerms = ['comments', 'candidates'].every(
      (fieldName) =>
        (document.getElementById(fieldName) as HTMLInputElement)?.checked
    )

    const password1 = document.getElementById('password1') as HTMLInputElement
    const password2 = document.getElementById('password2') as HTMLInputElement
    const passwordMatch = password1.value === password2.value

    //비밀번호 유효성 조건
    const isPasswordValid =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{10,20}$/.test(
        password1.value
      )

    //전화번호 유효성
    const isTelValid = /^010-\d{4}-\d{4}$/.test(phoneNumber)

    // 팝오버 갱신
    const updatePopover = (popoverName: string, value: boolean) => {
      setPopovers((prevState) => ({
        ...prevState,
        [popoverName]: value,
      }))
      setTimeout(() => {
        setPopovers((prevState) => ({
          ...prevState,
          [popoverName]: false,
        }))
      }, 3000)
    }

    // 약관 미동의 시 팝오버 표시
    if (!isAgreeTerms) {
      updatePopover('agreePopover', true)
      return
    }

    // 개인정보 필수 항목 누락 시 팝오버
    if (!isInfoComplete) {
      updatePopover('infoPopover', true)
      return
    }

    // 비밀번호 유효성 확인(영, 숫, 특)
    if (!isPasswordValid) {
      updatePopover('pwdPopover', true)
      return
    }

    // 비밀번호 재입력 일치하지 않을 때
    if (!passwordMatch) {
      updatePopover('pwdMatchPopover', true)
      return
    }

    // 전화번호 유효성 확인
    if (!isTelValid) {
      updatePopover('telPopover', true)
      return
    }

    // 약관에 동의하면 가입
    router.push('/')
  }

  return (
    <form className="max-w-lg mx-auto relative">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="font-semibold pt-32 text-2xl text-center text-gray-900">
            회원가입
          </h1>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            개인정보 작성란
          </h2>
          <div className="flex mt-1 text-sm leading-6 text-gray-600">
            회원가입에 필요한 개인정보를 작성해주세요.
            <p className="text-red-400">&emsp;* </p>
            <p className=" text-xs">필수 입력 항목</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                성<p className="text-red-400">*</p>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                이름<p className="text-red-400">*</p>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="id"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                학번<p className="text-red-400">*</p>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  autoComplete="given-name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 relative"></div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password1"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호<p className="text-red-400">*</p>
              </label>

              <div className="mt-2">
                <input
                  maxLength={16}
                  type="password"
                  name="password1"
                  id="password1"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-xs p-1 text-gray-500">
                최소 10자 이상 영문, 숫자, 특수문자를 <br />
                포함하여 입력해 주세요.
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password2"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호 확인<p className="text-red-400">*</p>
              </label>

              <div className="mt-2">
                <input
                  maxLength={16}
                  type="password"
                  name="password2"
                  id="password2"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="tel"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                전화번호<p className="text-red-400">*</p>
              </label>
              <div className="mt-2">
                <input
                  placeholder="010-0000-0000"
                  id="tel"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={handleChange}
                  maxLength={13}
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900 relative">
                이용 약관
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="assent1"
                      style={{ accentColor: '#497649' }}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                      required
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="assent1"
                      className="font-medium text-gray-900 flex"
                    >
                      서비스 이용약관 동의<p className="text-red-400">*</p>
                    </label>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="assent2"
                      style={{ accentColor: '#497649' }}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                      required
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="assent2"
                      className="font-medium text-gray-900 flex"
                    >
                      개인정보 수집 및 이용 동의
                      <p className="text-red-400">*</p>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 pb-6">
          <Link
            href="/"
            className="rounded-md btn-color1 px-3 py-2 text-sm font-semibold text-white shadow-md"
          >
            취소
          </Link>

          <button
            data-popover-target="popover-right"
            data-popover-placement="right"
            onClick={handleSignup}
            type="button"
            className="rounded-md btn-color2 px-3 py-2 text-sm font-semibold text-white shadow-md"
          >
            회원가입
          </button>
        </div>
      </div>

      {/* 정보 누락 팝오버 */}
      {popovers.infoPopover && (
        <div className="absolute z-10 bottom-10 text-sm font-bold text-gray-500">
          ❗ 필수 항목을 작성해주세요.
        </div>
      )}
      {/* 비밀번호 유효성 */}
      {popovers.pwdPopover && (
        <div className="absolute z-10 bottom-10 text-sm font-bold text-gray-500">
          ❗ 비밀번호가 유효하지 않습니다.
        </div>
      )}
      {/* 패스워드 일치하지 않을 때  */}
      {popovers.pwdMatchPopover && (
        <div className="absolute z-10 bottom-10 text-sm font-bold text-gray-500">
          ❗ 비밀번호가 일치하지 않습니다.
        </div>
      )}
      {/* 약관 동의 팝오버 */}
      {popovers.agreePopover && (
        <div className="absolute z-10 bottom-10 text-sm font-bold text-gray-500">
          ❗❗ 이용 약관에 모두 동의해주세요.
        </div>
      )}
      {popovers.telPopover && (
        <div className="absolute z-10 bottom-10 text-sm font-bold text-gray-500">
          ❗❗ 전화번호가 유효하지 않습니다.
        </div>
      )}
    </form>
  )
}

export default Page
