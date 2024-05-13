'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import './addr.css'

type Address = {
  id: number
  postcode: string
  address: string
  recipient: string
  phonenum: string
  request: string
  isDefault: boolean
}

const AddrPage: React.FC = () => {
  const [postcode, setPostcode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [phonenum, setPhonenum] = useState<string>('')
  const [selectedRequest, setSelectedRequest] = useState<string>('')
  const [addresses, setAddresses] = useState<Address[]>([])

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value)
  }

  const handlePhonenumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhonenum(e.target.value)
  }

  const handleRequestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRequest(e.target.value)
  }

  const searchAddressByPostcode = async () => {
    try {
      const response = await axios.get(
        `http://dapi.kakao.com/v2/local/search/address.json?query=${postcode}`,
        {
          headers: {
            Authorization: 'KakaoAK YOUR_KAKAO_REST_API_KEY', // 카카오 REST API 키
          },
        }
      )

      const data = response.data
      if (data.documents.length > 0) {
        const firstAddress = data.documents[0]
        const fullAddress = `${firstAddress.address_name} (${firstAddress.road_address_name})`
        setAddress(fullAddress)
      } else {
        setAddress('주소를 찾을 수 없습니다.')
      }
    } catch (error) {
      console.error('Error searching address:', error)
      setAddress('주소를 찾을 수 없습니다.')
    }
  }

  const addAddress = () => {
    if (
      postcode.trim() === '' ||
      address.trim() === '' ||
      recipient.trim() === '' ||
      phonenum.trim() === '' ||
      selectedRequest.trim() === ''
    ) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    const newAddress: Address = {
      id: addresses.length + 1,
      postcode: postcode,
      address: address,
      recipient: recipient,
      phonenum: phonenum,
      request: selectedRequest,
      isDefault: false,
    }

    setAddresses([...addresses, newAddress])
    setPostcode('')
    setAddress('')
    setRecipient('')
    setPhonenum('')
    setSelectedRequest('')
  }

  const deleteAddress = (id: number) => {
    const filteredAddresses = addresses.filter((addr) => addr.id !== id)
    setAddresses(filteredAddresses)
  }

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
          <form>
            <h2 className="addrSetName text-2xl font-bold mb-6">배송지 관리</h2>
            <div className="inputCon">
              <label>이름</label>
              <input
                type="text"
                placeholder="수령인 이름"
                value={recipient}
                onChange={handleRecipientChange}
              />
            </div>
            <div className="inputCon">
              <label>휴대전화</label>
              <input
                type="text"
                placeholder="휴대전화 번호"
                value={phonenum}
                onChange={handlePhonenumChange}
              />
            </div>
            <div className="inputCon">
              <label>주소</label>
              <div
                className="addrRow"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  type="text"
                  placeholder="우편번호"
                  value={postcode}
                  onChange={handlePostcodeChange}
                  style={{ marginRight: '10px' }}
                />
                <button
                  className="addrBt"
                  type="button"
                  onClick={searchAddressByPostcode}
                >
                  주소 검색
                </button>
              </div>
              <input
                type="text"
                placeholder="상세 주소"
                value={address}
                onChange={handleAddressChange}
                className="inputConAdd"
              />
            </div>
            <div className="inputCon">
              <label>배송 요청사항</label>
              <select value={selectedRequest} onChange={handleRequestChange}>
                <option value="배송 시 요청사항을 선택해주세요.">
                  배송 시 요청사항을 선택해주세요.
                </option>
                <option value="부재 시 경비실에 맡겨주세요.">
                  부재 시 경비실에 맡겨주세요.
                </option>
                <option value="부재 시 택배함에 넣어주세요.">
                  부재 시 택배함에 넣어주세요.
                </option>
                <option value="부재 시 집 앞에 놔주세요.">
                  부재 시 집 앞에 놔주세요.
                </option>
                <option value="배송 전 연락 바랍니다.">
                  배송 전 연락 바랍니다.
                </option>
                <option value="요청 사항 없습니다.">요청 사항 없습니다.</option>
              </select>
            </div>
            <button onClick={addAddress}>등록하기</button>
            <div>
              {addresses.map((addr) => (
                <div key={addr.id}>
                  <label>
                    {addr.postcode} - {addr.address} ({addr.recipient},{' '}
                    {addr.phonenum})
                  </label>
                  <button onClick={() => deleteAddress(addr.id)}>
                    주소 삭제
                  </button>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddrPage
