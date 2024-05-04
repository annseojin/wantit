'use client'

import Menu from '@/components/menu'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import { useSearchParams } from 'next/navigation'
import ProductList from '@/components/productList'
import { Product, products } from '../../hooks/hooks'
import Link from 'next/link'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  const handleSaveClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter(
    (product) => search === null || product.title.includes(search)
  )

  return (
    <div className="bg-color">
      <Menu />

      <div className="flex flex-col items-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-8">
          {search === null || search === ''
            ? '상품 목록'
            : `"${search}" 검색 결과`}
        </h2>

        <div className=" w-full max-w-5xl text-right pb-8">
          <Link
            href="/writing"
            className="
            text-white font-semibold py-3 px-4
            rounded-md btn-color2"
          >
            글쓰기
          </Link>
        </div>

        <ProductList
          products={filteredProducts}
          handleSaveClick={handleSaveClick}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  )
}
