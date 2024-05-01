'use client'
import { useState, FormEvent, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileUrl = URL.createObjectURL(file)
      setImages((prevImages) => [...prevImages, fileUrl]) // 이미지 URL을 상태 배열에 추가
      e.target.value = '' // 파일 입력 리셋
    }
  }

  const removeImage = (srcToRemove: string) => {
    setImages((prevImages) => prevImages.filter((src) => src !== srcToRemove))
  }

  const openModal = (src: string) => {
    setSelectedImage(src)
    setIsModalOpen(true)
  }

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage('')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto">
          <header className="flex justify-between items-center pb-6"></header>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto"
          >
            <div className="mb-4">
              <div className="flex gap-2 my-8 max-h-10">
                {images.map((src) => (
                  <div className="group relative">
                    <Image
                      src={src}
                      alt="이미지파일"
                      width={100}
                      height={100}
                      className="w-16 h-16"
                      onClick={() => openModal(src)}
                    />
                    <button
                      onClick={() => removeImage(src)}
                      className="absolute top-0 right-0 bg-red-400 p-1 rounded-md
                       opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Image
                        src="/close.svg"
                        alt="닫기"
                        width={10}
                        height={10}
                      />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="p-1 border rounded bg-gray-400 ml-auto
                  hover:bg-gray-600 duration-200 px-4 mr-4"
                  onClick={handleImageUpload}
                >
                  <Image src="/img.png" alt="이미지" width={20} height={20} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <input
                className="w-full p-4 border-y border-gray-200"
                type="text"
                placeholder="제목 작성하기"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <div
                ref={contentRef}
                contentEditable
                className="w-full p-4 border-y-2 border-gray-200 min-h-80"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Link
                href="/product"
                className="py-2 px-6 bg-gray-200
              hover:bg-gray-300 duration-300 rounded"
              >
                취소
              </Link>
              <Link
                href="/product"
                className="py-2 px-6 bg-gray-500 text-white rounded
                hover:bg-gray-600 duration-300"
              >
                저장
              </Link>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={closeModal} // 모달 배경 클릭 시 모달 닫기
        >
          <div className="bg-white p-4 rounded max-w-sm max-h-full overflow-auto">
            <Image
              src={selectedImage}
              layout="fill"
              alt="Selected"
              className="object-contain z-40 p-6"
            />
          </div>
        </div>
      )}
    </>
  )
}
