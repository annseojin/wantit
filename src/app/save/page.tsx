'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/hooks/hooks'

export default function Page() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '상품명',
      price: '10000원',
      imageUrl: '/favicon.ico',
    },
    {
      id: 2,
      name: '상품명',
      price: '20000원',
      imageUrl: '/profile.jpg',
    },
  ])

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [closeProduct, setCloseProduct] = useState<boolean>(true)

  // 삭제 버튼
  const removeProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId))
    setSelectedProduct(null)
  }

  // 테이블 전체 삭제
  const removeAll = () => {
    setProducts([])
    setSelectedProduct(null)
  }

  // 상품 클릭 시
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCloseProduct(true)
  }

  const handleCloseProduct = () => {
    setCloseProduct(false)
  }

  return (
    <main className="md:flex-row min-h-screen ">
      <div className="py-24 banner-color"></div>
      <div className="p-12 max-w-7xl mx-auto flex">
        <div className="flex flex-col w-3/4 p-6 gap-y-6">
          <div className="w-auto h-12 whitespace-nowrap text-[2rem] leading-[2.75rem]">
            찜목록
            <hr className="my-6" />
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pl-3">
                  <div className="w-auto">상품</div>
                </th>
                <th className="h-12"></th>
                <th className="h-12 text-left">
                  <div className="w-auto">가격</div>
                </th>
                <th className="h-12">
                  <div className="flex justify-end pr-3">
                    <button
                      className="w-auto hover:bg-red-500 hover:text-white p-1 rounded-md"
                      onClick={removeAll}
                    >
                      전체 삭제
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td
                    className="pl-3 p-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="flex w-24 h-24 p-4 rounded-large justify-center items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-y-2">
                      <div className="w-auto">{product.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <div className="w-auto">{product.price}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-end pr-3">
                      <button
                        className="w-auto p-1 rounded-md hover:bg-gray-100 hover:text-gray-500"
                        onClick={() => removeProduct(product.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedProduct && closeProduct && (
          <div className="md:w-1/4">
            <div
              className="gap-4 h-full w-full 
    flex flex-col justify-center 
    items-center p-12 relative"
            >
              <button
                className="absolute right-1 top-1 p-2 
              bg-gray-200 rounded-lg hover:bg-red-400 
              hover:text-white duration-200"
                onClick={handleCloseProduct}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>

              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                width={100}
                height={100}
                className="w-24 h-auto object-contain"
              />
              <div className="text-center mt-2">
                <div className="text-lg font-semibold">
                  {selectedProduct.name}
                </div>{' '}
                <div className="text-lg font-semibold">
                  {selectedProduct.price}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
