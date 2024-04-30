'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './purchase.css'
import Link from 'next/link'

type Purchase = {
  productName: string
}

const Purchase = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]) // 구매 내역을 상태로 관리

  const tempPurchaseHistory: Purchase[] = [
    // 임시 데이터
    { productName: '첫 번째 상품' },
    { productName: '두 번째 상품' },
    { productName: '세 번째 상품' },
  ]

  useEffect(() => {
    // API에서 구매 내역을 가져오는 비동기 함수 정의
    const fetchPurchaseHistory = async () => {
      try {
        // 임시 데이터를 구매 내역으로 설정
        setPurchaseHistory(tempPurchaseHistory)
      } catch (error) {
        console.error('Error : ', (err as Error).message)
        // 오류 처리
      }
    }

    // 컴포넌트가 마운트되면 구매 내역을 가져오는 함수 호출
    fetchPurchaseHistory()
  }, []) // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 설정

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
          <h1 className="editInfo text-2xl font-bold mb-6">구매 내역</h1>
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
                  src="/clothes1.jpg"
                  alt="clothes"
                  width={100}
                  height={100}
                />
                <div className="productExp">
                  <h3 className="productName">
                    Diesel Dx1342 Stainless Steel Pendant Necklace Silver
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">배송 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image src="/book1.jpg" alt="book" width={100} height={100} />
                <div className="productExp">
                  <h3 className="productName">정보보호개론 - 한빛미디어</h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">배송 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image
                  src="/clothes2.jpg"
                  alt="clothes"
                  width={100}
                  height={100}
                />
                <div className="productExp">
                  <h3 className="productName">
                    Vivienne Westwood Saffiano Black and White Keyring Black
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">배송 완료</div>
            </div>
            <div className="purchaseList">
              <div className="purchaseInfo">
                <Image src="/book2.jpg" alt="book" width={100} height={100} />
                <div className="productExp">
                  <h3 className="productName">
                    2024 시나공 정보처리기사 필기 기본서 - 길벗
                  </h3>
                </div>
              </div>
              <div className="purchaseDate">24/02/24</div>
              <div className="shipping">배송 완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Purchase
