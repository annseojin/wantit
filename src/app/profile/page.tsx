'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import './profile.css'
import Link from 'next/link'

const profile = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePhonenumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhonenumber(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('ID : ', id)
    console.log('Password : ', password)
    console.log('Name : ', name)
    console.log('Email : ', email)
    console.log('Phone Number : ', phonenumber)
  }

  /*const updateProfile = (updatedProfile) => {
    fetch('API_URL_HERE', {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(updatedProfile)
    })
    .then(response => response.json())
    .then(data => {
        setProfile(data);
    })
    .catch(error => {
        console.error('ERROR', error);
    })
  }
*/

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
          <h2>회원 정보 수정</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>아이디</label>
              <input type="text" value={id} onChange={handleIdChange} />
            </div>
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label>이름</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
              <label>이메일</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label>휴대전화</label>
              <input
                type="text"
                value={phonenumber}
                onChange={handlePhonenumberChange}
              />
            </div>
            <button type="submit">저장</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default profile
