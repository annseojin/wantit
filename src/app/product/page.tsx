'use client'

import Menu from '@/components/menu'
import React from 'react'
import { useState } from 'react'
import Modal from '@/components/modal'
import PageButton from '@/components/pageButton'
import Image from 'next/image'

// 상품 정보
interface Product {
  title: string
  content: string
  name: string
  imageSrc: string
  imageAlt: string
  price: string
}

const products = [
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
  {
    title: '검은 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
  },
]

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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
          판매 상품
        </h2>

        <div
          className="mt-6 max-w-5xl grid grid-cols-1 
        gap-x-6 gap-y-10 
        sm:grid-cols-2 lg:grid-cols-4 
        xl:gap-x-10"
        >
          {products.map((product) => (
            <div
              className="py-2 px-2 group relative
              border rounded-lg shadow-md"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={300}
                  height={300}
                  layout="responsive"
                  onClick={() => handleSaveClick(product)}
                  className="object-cover object-center"
                />
              </div>

              <div className="font-bold text-center">{product.title}</div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p>
                      <span aria-hidden="true" className="inset-0" />
                      {product.name}
                    </p>
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  <p
                    onClick={() => handleSaveClick(product)}
                    className="mt-1 text-sm font-semibold 
                    text-white text-center
                    bg-slate-600 rounded-lg
                    hover:bg-slate-800 
                    cursor-pointer"
                  >
                    {product.save}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
