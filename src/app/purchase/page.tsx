'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './purchase.css'
import Link from 'next/link'

const Purchase = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]) // 구매 내역을 상태로 관리

  type Purchase = {
    productName: string
  }

  const fetchPurchaseHistory = async (): Promise<Purchase[]> => {
    // API에서 구매 내역을 가져오는 비동기 함수 정의
    try {
      const response = await fetch('API_URL_HERE')
      if (!response.ok) {
        throw new Error('Fail')
      }
      const data = await response.json()
      return data as Purchase[]
    } catch (error) {
      console.error('Error : ', (error as Error).message)
      return []
    }
  }

  useEffect(() => {
    fetchPurchaseHistory()
  }, [])

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
          <h2> 구매 내역 </h2>
          {purchaseHistory.length > 0 ? (
            <ul>
              {purchaseHistory.map((purchase, index) => (
                <li key={index}>
                  <span>{purchase.productName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>구매 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default Purchase
