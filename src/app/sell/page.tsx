'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './sell.css'
import Link from 'next/link'

type SellItem = {
  productName: string
  sellDate: string
  status: string
  imageUrl: string
}

const Sell = () => {
  const [sellHistory, setSellHistory] = useState<SellItem[]>([]) // 판매 내역을 상태로 관리
  const [selectedTab, setSelectedTab] = useState<string>('all') // 선택된 탭 상태 추가

  // 가상 데이터로 판매 내역 초기화
  const tempSellHistory: SellItem[] = [
    {
      productName: 'Supreme Military Camp Cap Stone Camo - 23SS',
      sellDate: '2024-05-04',
      status: '거래 중',
      imageUrl: '/clothes3.png',
    },
    {
      productName: 'Do it! 점프 투 파이썬 - 박응용',
      sellDate: '2024-05-01',
      status: '거래 중',
      imageUrl: '/book3.jpg',
    },
    {
      productName: 'IAB Studio Hoodie Black',
      sellDate: '2024-03-19',
      status: '판매 완료',
      imageUrl: '/clothes4.png',
    },
    {
      productName: '혼자 공부하는 네트워크 - 강민철',
      sellDate: '2024-02-24',
      status: '판매 완료',
      imageUrl: '/book4.jpg',
    },
  ]

  const fetchSellHistory = async () => {
    // API에서 판매 내역을 가져오는 비동기 함수 정의
    try {
      // 실제 백엔드 API에서 데이터를 가져올 때 사용
      // const response = await fetch('API_URL_HERE')
      // const data = await response.json()
      // setSellHistory(data)

      // 가상 데이터 사용
      setSellHistory(tempSellHistory)
    } catch (error) {
      console.error('Error : ', (error as Error).message)
    }
  }

  useEffect(() => {
    fetchSellHistory()
  }, [])

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab) // 선택된 탭 상태 변경
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
          <h1 className="editInfo text-2xl font-bold mb-6">판매 내역</h1>
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
                거래 중
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
                판매 완료
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
            {sellHistory.map((item, index) => {
              if (
                selectedTab === 'all' ||
                (selectedTab === 'ongoing' && item.status === '거래 중') ||
                (selectedTab === 'completed' && item.status === '판매 완료')
              ) {
                return (
                  <div className="purchaseList" key={index}>
                    {/* 판매 상품 정보 */}
                    <div className="purchaseInfo">
                      <Image
                        src={item.imageUrl}
                        alt="product"
                        width={100}
                        height={100}
                      />
                      <div className="productExp">
                        <h3 className="productName">{item.productName}</h3>
                      </div>
                    </div>
                    {/* 판매 날짜 및 상태 */}
                    <div className="purchaseDate">{item.sellDate}</div>
                    <div className="shipping">{item.status}</div>
                  </div>
                )
              }
              return null // 필터링 조건에 맞지 않는 경우 렌더링하지 않음
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sell
