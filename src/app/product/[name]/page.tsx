'use client'

import Menu from '@/components/menu'
import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import PageButton from '@/components/pageButton'
import ProductList from '@/components/productList'
import { usePathname, useSearchParams } from 'next/navigation'
import { Product, products } from '../../../hooks/product'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const searchParams = useSearchParams()
  const search = searchParams.get('q')
  const path = usePathname().split('/').pop()

  // 동적 라우팅 주소랑 카테고리와 값을 비교해서 상품 띄우고
  // 쿼리값을 받아서 타이틀에 포함되면 해당 상품 목록 띄우기
  useEffect(() => {
    if (path) {
      const filtered = search
        ? products
            .filter((product) => product.title.includes(search))
            .filter((product) => product.category === path)
        : products.filter((product) => product.category === path)
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [path, search])

  const handleSaveClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="bg-white">
      <Menu />

      <div className="flex flex-col items-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-8">
          {search === null || search === ''
            ? '상품 목록'
            : `"${search}" 검색 결과`}
        </h2>

        <ProductList
          products={filteredProducts}
          handleSaveClick={handleSaveClick}
        />
      </div>
      <PageButton />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  )
}
