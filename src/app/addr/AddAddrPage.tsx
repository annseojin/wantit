'use client'
import React, { useState } from 'react'
import axios from 'axios'
import './addAddr.css'
import Link from 'next/link'
import AddrPage from './AddrPage'

type Address = {
  id: number
  postcode: string
  address: string
  recipient: string
  phonenum: string
  request: string
  isDefault: boolean
}

interface AddAddrPageProps {
  addAddress: (newAddress: Address) => void
}

const AddAddrPage: React.FC<AddAddrPageProps> = ({ addAddress }) => {
  const [postcode, setPostcode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [phonenum, setPhonenum] = useState<string>('')
  const [selectedRequest, setSelectedRequest] = useState<string>('')

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

  const handleAddAddress = () => {
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
      id: Date.now(),
      postcode: postcode,
      address: address,
      recipient: recipient,
      phonenum: phonenum,
      request: selectedRequest,
      isDefault: false,
    }

    addAddress(newAddress)

    setPostcode('')
    setAddress('')
    setRecipient('')
    setPhonenum('')
    setSelectedRequest('')
  }

  return (
    <div style={{ backgroundColor: '#f6f7f3' }}>
      <div className="addAddrSet">
        <form>
          <h2 className="addAddrSetName text-2xl font-bold mb-6">
            배송지 추가
          </h2>
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
            <label>연락처</label>
            <input
              type="text"
              placeholder="연락처"
              value={phonenum}
              onChange={handlePhonenumChange}
            />
          </div>
          <div className="inputCon">
            <label>우편번호</label>
            <input
              type="text"
              placeholder="우편번호"
              value={postcode}
              onChange={handlePostcodeChange}
            />
            <button type="button" onClick={searchAddressByPostcode}>
              우편번호 찾기
            </button>
          </div>
          <div className="inputCon">
            <label>주소</label>
            <input
              type="text"
              placeholder="주소"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="inputCon">
            <label>요청사항</label>
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
          <button type="button" onClick={handleAddAddress}>
            추가
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAddrPage
