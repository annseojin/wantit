'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import './mypage.css'
import Link from 'next/link'

const BasicProfile = () => {
  // 기본 정보
  const [profile, setProfile] = useState({
    id: 'ghdrlfehd',
    password: 'ghdrlfehd123',
    name: '홍길동',
    email: 'ghdrlfehd@naver.com',
    phonenumber: '010-1234-5678',
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 회원 정보 수정
    const { name, value } = e.target
    setProfile((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const saveProfile = () => {
    // 회원 정보 저장
    console.log('저장된 회원 정보 : ', BasicProfile)
  }

  return (
    <div>
      <div className="myPage">
        <h1 className="text-3xl font-bold">My Page</h1>
        <div className="profile">
          <Image
            src="/profile.jpg"
            alt="basic profile"
            width={150}
            height={150}
            className="basicProfile object-cover mt-10"
          />
          <b className="name text-5xl">이름</b>
        </div>
      </div>

      <div className="page">
        <div className="myPageMenu">
          <div className="menuMyInfo">
            <Link href="/mypage" className="mt-10 mb-2 text-2xl font-bold">
              내 정보
            </Link>
            <Link href="/profile" className="mb-2">
              프로필 관리
            </Link>
          </div>
          <div className="menuShopInfo">
            <h2 className="mt-7 mb-2 text-2xl font-bold">쇼핑 정보</h2>
            <Link href="/purchase" className="mb-2">
              구매 내역
            </Link>
            <Link href="/sell" className="mb-2">
              판매 내역
            </Link>
            <Link href="/save" className="mb-2">
              찜
            </Link>
          </div>
        </div>

        <div>
          <h2>회원 정보</h2>
          <form>
            <div>
              <label>아이디 : </label>
              <input
                type="text"
                name="id"
                value={profile.id}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label>비밀번호 : </label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label>이름 : </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label>이메일 : </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label>휴대전화 : </label>
              <input
                type="text"
                value={profile.phonenumber}
                onChange={handleProfileChange}
              />
            </div>
            <button type="button" onClick={saveProfile}>
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BasicProfile
