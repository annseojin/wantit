'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './sell.css'
import Link from 'next/link'

const Sell = () => {
  const [sellHistory, setSellHistory] = useState([]) // 판매 내역을 상태로 관리

  const fetchSellHistory = async () => {
    // API에서 판매 내역을 가져오는 비동기 함수 정의
    try {
      const response = await fetch('API_URL_HERE')
      if (!response.ok) {
        throw new Error('Fail')
      }
      const data = await response.json()
      setSellHistory(data)
    } catch (error) {
      console.error('Error : ', (error as Error).message)
    }
  }

  useEffect(() => {
    fetchSellHistory()
  }, [])

  return (
    <div>
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

        <div className="purchase">
          <h1 className="editInfo text-2xl font-bold mb-6">판매 내역</h1>
          <div className="tab-container">
            <div className="tab-box">
              <div className="tab-button active">전체</div>
              <div className="tabLine"></div>
            </div>
            <div className="tab-box">
              <div className="tab-button">거래 중</div>
              <div className="tabLine"></div>
            </div>
            <div className="tab-box">
              <div className="tab-button">종료</div>
            </div>
          </div>
          <div>
            {/*<h2>구매 내역</h2>
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
            )}*/}

            <div className="purchaseList mt-5">
              <div className="purchaseInfo">
                <Image
                  src="/clothes3.png"
                  alt="clothes"
                  width={100}
                  height={100}
                />
                <div className="productExp">
                  <h3 className="productName">
                    Supreme Military Camp Cap Stone Camo - 23SS
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">판매 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image src="/book3.jpg" alt="book" width={100} height={100} />
                <div className="productExp">
                  <h3 className="productName">
                    Do it! 점프 투 파이썬 - 박응용
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">판매 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image
                  src="/clothes4.png"
                  alt="clothes"
                  width={100}
                  height={100}
                />
                <div className="productExp">
                  <h3 className="productName">IAB Studio Hoodie Black</h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">판매 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image src="/book4.jpg" alt="book" width={100} height={100} />
                <div className="productExp">
                  <h3 className="productName">
                    혼자 공부하는 네트워크 - 강민철
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">판매 완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sell
