'use client'
import { useState, FormEvent, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const [images, setImages] = useState<string[]>([])
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
      setImages((prevImages) => [...prevImages, fileUrl])
      e.target.value = ''
    }
  }

  const removeImage = (srcToRemove: string) => {
    setImages((prevImages) => prevImages.filter((src) => src !== srcToRemove))
  }

  const openModal = (src: string) => {
    setSelectedImage(src)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage('')
  }

  return (
    <>
      <div className="min-h-screen bg-color">
        <div className="container mx-auto">
          <header className="flex justify-between items-center pb-6"></header>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto"
          >
            <div className="mb-4">
              <div className="flex gap-2 my-8 max-h-10">
                <button
                  type="button"
                  className="p-1 border rounded btn-color1
                  duration-200 px-4 py-2 ml-4"
                  onClick={handleImageUpload}
                >
                  <Image src="/img.png" alt="이미지" width={20} height={20} />
                </button>
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

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="text-right">
              <input
                type="text"
                name="price"
                className="p-2 border-y border-gray-200 text-right"
                placeholder="가격을 입력하세요."
              />
            </div>

            <div className="relative py-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type="text"
                name="title"
                className="w-full p-4 border-y border-gray-200"
                placeholder="제목을 입력하세요."
              />

              <div className="absolute inset-y-0 right-0 flex items-center">
                <select className="h-1/2 border-l-2 px-4 text-gray-400 font-medium text-sm">
                  <option selected>카테고리</option>
                  <option value="clothes">의류</option>
                  <option value="book">교재</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <div
                ref={contentRef}
                contentEditable
                className="p-4 border-b-2 border-gray-200 min-h-80"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Link
                href="/product"
                className="py-2 px-6 btn-color1 text-white duration-300 rounded"
              >
                취소
              </Link>
              <Link
                href="/product"
                className="py-2 px-6 btn-color2 text-white rounded
                 duration-300"
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
          onClick={closeModal}
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
