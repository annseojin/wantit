'use client'
import React, { useState } from 'react'
import AddrPage from './AddrPage'
import AddAddrPage from './AddAddrPage'
import Link from 'next/link'

type Address = {
  id: number
  postcode: string
  address: string
  recipient: string
  phonenum: string
  request: string
  isDefault: boolean
}

const Addr: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      postcode: '12345',
      address: '경기도 고양시 덕양구 동헌로 305',
      recipient: '홍길동',
      phonenum: '01012345678',
      request: '경비실에 맡겨주세요',
      isDefault: true,
    },
    {
      id: 2,
      postcode: '67890',
      address: '서울특별시 강남구 삼성동',
      recipient: '김철수',
      phonenum: '01098765432',
      request: '집 앞에 놔주세요',
      isDefault: false,
    },
  ])

  const addAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress])
  }

  const deleteAddress = (id: number) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id)
    setAddresses(updatedAddresses)
  }

  const [isAddingAddress, setIsAddingAddress] = useState(false)

  const handleAddAddressClick = () => {
    setIsAddingAddress(true)
  }

  const handleAddAddressCancel = () => {
    setIsAddingAddress(false)
  }

  return (
    <div>
      {!isAddingAddress && <Link href="/AddAddrPage"></Link>}
      {isAddingAddress && (
        <div>
          <AddAddrPage addAddress={addAddress} />
        </div>
      )}
      <AddrPage
        addresses={addresses}
        deleteAddress={deleteAddress}
        addAddress={addAddress}
      />
    </div>
  )
}

export default Addr
