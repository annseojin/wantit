'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './addr.css'
import AddAddrPage from './AddAddrPage'

interface Address {
  id: number
  postcode: string
  address: string
  recipient: string
  phonenum: string
  request: string
  isDefault: boolean
}

interface AddrPageProps {
  addresses: Address[]
  deleteAddress: (id: number) => void
  addAddress: (newAddress: Address) => void
}

const AddrPage: React.FC<AddrPageProps> = ({
  addresses,
  deleteAddress,
  addAddress,
}) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  const handleAddAddressClick = () => {
    setIsAddingAddress(true)
  }

  const handleAddAddressCancel = () => {
    setIsAddingAddress(false)
  }
  return (
    <div style={{ backgroundColor: '#f6f7f3' }}>
      <div className="myPage">
        <h1 className="myPageH1 text-3xl font-bold">My Page</h1>
        <div className="profile">
          <Image
            src="/profile.jpg"
            alt="basic profile"
            width={150}
            height={150}
            className="basicProfile object-cover mt-10"
          />
          <div className="nameCon">
            <b className="name text-5xl">홍길동</b>
            <Link href="/profile" className="editProfile">
              프로필 수정
            </Link>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="myPageMenu">
          <div className="menuMyInfo">
            <Link href="/mypage" className="mt-10 mb-2 text-2xl font-bold">
              내 정보
            </Link>
            <Link href="/profile" className="mb-2">
              프로필 수정
            </Link>
            <Link href="/addr" className="mb-2">
              배송지 관리
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

        <div className="addrSet">
          <h2 className="addrSetName text-2xl font-bold mb-6">배송지 관리</h2>
          <table>
            <thead>
              <tr>
                <th>배송지</th>
                <th>주소</th>
                <th>연락처</th>
                <th>동작</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td>
                    {address.recipient}
                    {address.isDefault && '<기본 배송지>'}
                  </td>
                  <td>{address.address}</td>
                  <td>{address.phonenum}</td>
                  <td>
                    <button
                      className="addrbt"
                      onClick={() => deleteAddress(address.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isAddingAddress && (
            <button onClick={handleAddAddressClick} className="mb-2 addAddr">
              배송지 추가
            </button>
          )}
          {isAddingAddress && (
            <div>
              <AddAddrPage addAddress={addAddress} />
              <button onClick={handleAddAddressCancel} className="addrBtCan">
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddrPage
