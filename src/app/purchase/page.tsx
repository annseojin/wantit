'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './purchase.css'

type Purchase = {
  productName: string
  shippingStatus: string
  purchaseDate: string
}

const Purchase = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([])
  const [selectedTab, setSelectedTab] = useState<string>('all')

  const tempPurchaseHistory: (Purchase & { imageUrl: string })[] = [
    {
      productName: 'Diesel Dx1342 Stainless Steel Pendant Necklace Silver',
      shippingStatus: '배송 중',
      purchaseDate: '2024-05-04',
      imageUrl: '/clothes1.jpg',
    },
    {
      productName: '정보보호개론 - 한빛미디어',
      shippingStatus: '배송 중',
      purchaseDate: '2024-05-01',
      imageUrl: '/book1.jpg',
    },
    {
      productName: 'Vivienne Westwood Saffiano Black and White Keyring Black',
      shippingStatus: '배송 완료',
      purchaseDate: '2024-03-19',
      imageUrl: '/clothes2.jpg',
    },
    {
      productName: '2024 시나공 정보처리기사 필기 기본서 - 길벗',
      shippingStatus: '배송 완료',
      purchaseDate: '2024-02-24',
      imageUrl: '/book2.jpg',
    },
  ]

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        setPurchaseHistory(tempPurchaseHistory)
      } catch (error) {
        console.error('Error : ', (error as Error).message)
      }
    }

    fetchPurchaseHistory()
  }, [])

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
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

        <div className="purchase">
          <h1 className="editInfo text-2xl font-bold mb-6">구매 내역</h1>
          <div className="tab-container">
            <div className="tab-box" onClick={() => handleTabClick('all')}>
              <div
                className={`tab-button ${
                  selectedTab === 'all' ? 'active' : ''
                }`}
              >
                전체
              </div>
              <div className="tabLine"></div>
            </div>
            <div className="tab-box" onClick={() => handleTabClick('ongoing')}>
              <div
                className={`tab-button ${
                  selectedTab === 'ongoing' ? 'active' : ''
                }`}
              >
                배송 중
              </div>
              <div className="tabLine"></div>
            </div>
            <div
              className="tab-box"
              onClick={() => handleTabClick('completed')}
            >
              <div
                className={`tab-button ${
                  selectedTab === 'completed' ? 'active' : ''
                }`}
              >
                배송 완료
              </div>
            </div>
          </div>

          <div className="header">
            <h3 className="header1">상품</h3>
            <h3 className="header2">상품명</h3>
            <h3 className="header3">구매일자</h3>
            <h3 className="header4">구매상태</h3>
          </div>
          <div>
            {purchaseHistory.length > 0 ? (
              <div>
                {purchaseHistory.map((purchase, index) => {
                  if (
                    selectedTab === 'all' ||
                    (selectedTab === 'ongoing' &&
                      purchase.shippingStatus === '배송 중') ||
                    (selectedTab === 'completed' &&
                      purchase.shippingStatus === '배송 완료')
                  ) {
                    return (
                      <div className="purchaseList" key={index}>
                        <div className="purchaseInfo">
                          <Image
                            src={purchase.imageUrl}
                            alt="product"
                            width={100}
                            height={100}
                          />
                          <div className="productExp">
                            <h3 className="productName">
                              {purchase.productName}
                            </h3>
                          </div>
                        </div>
                        <div className="purchaseDate">
                          {purchase.purchaseDate}
                        </div>
                        <div className="shipping">
                          {purchase.shippingStatus}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            ) : (
              <p>구매 내역이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Purchase
