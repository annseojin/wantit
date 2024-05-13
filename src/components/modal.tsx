import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { ModalProps } from '@/hooks/hooks'

// 속성값 전달 받기
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  // 모달창 고정
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const handleSaveProduct = async () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row modal">
          <div className="w-96 p-4">
            <div className="h-full justify-evenly flex flex-col">
              <Image
                src={product.imageSrc}
                width={320}
                height={320}
                alt="Product Image"
                className="w-64 h-64 mx-auto mt-6 object-contain"
              />{' '}
              <div>
                <p className="text-sm font-medium text-gray-700 text-center">
                  {product.name}
                </p>
                <p className="text-lg font-bold text-gray-900 text-center">
                  {product.price}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 w-full flex flex-col justify-between">
            {' '}
            <div>
              <button
                onClick={onClose}
                className="ml-auto bg-transparent border-none hover:bg-gray-100 p-2 
                rounded-md text-black float-right"
              >
                <Image src="/close.svg" alt="닫기" width={12} height={12} />
              </button>
              <div></div>
              <div className="pt-16 text-center">
                {' '}
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-500 mt-4">{product.content}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1"></div>
              <div className="flex flex-1 space-between gap-4">
                <button
                  className="flex-1 btn-color1 text-white rounded-md py-2 text-sm"
                  onClick={handleSaveProduct}
                >
                  찜하기
                </button>
                <button
                  className="flex-1 btn-color2 text-white rounded-md py-2 text-sm"
                  onClick={onClose}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
