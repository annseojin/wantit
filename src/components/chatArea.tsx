import React, { useRef, useEffect, useState } from 'react'
import MessageModal from './messageModal'
import Image from 'next/image'
import { ChatAreaProps } from '@/hooks/hooks'

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  sendMessage,
  sendMedia,
  input,
  setInput,
  isInitialLoad,
  deleteMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  )
  const [showFileModal, setShowFileModal] = useState<boolean>(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    if (!isInitialLoad) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isInitialLoad])

  const confirmDeletion = (confirmed: boolean) => {
    setShowDeleteModal(false)
    if (confirmed && selectedMessageId !== null) {
      deleteMessage(selectedMessageId)
    }
  }

  // 채팅 입력 시 아래로 자동스크롤
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      sendMessage(input)
      setInput('')
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 0)
    }
  }

  // 채팅에 미디어파일 전송하기
  const handleUploadMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setFileToUpload(file)
      setShowFileModal(true)
    }
  }

  //전송 여부 확인창
  const confirmFileUpload = (confirmed: boolean) => {
    setShowFileModal(false)
    if (confirmed && fileToUpload) {
      sendMedia(fileToUpload)
      setFileToUpload(null)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 0)
    }
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="flex-1 p-4">
        <div className="h-full flex flex-col">
          <div className="p-4 bg-white shadow">상대방1</div>
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                } items-start space-x-2`}
              >
                {message.sender !== 'user' && (
                  <img
                    src={message.profileImg}
                    alt={message.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {message.sender !== 'user' ? message.name : ''}
                  </span>
                  <span className="block max-w-72 px-4 py-2 shadow rounded-lg break-words overflow-hidden">
                    {message.text}
                    {message.imageUrl && (
                      <div onClick={() => openImageModal(message.imageUrl!)}>
                        <Image
                          src={message.imageUrl}
                          alt={message.imageUrl}
                          width={100}
                          height={100}
                          className="mt-2 w-40 h-40 cursor-pointer"
                        />
                      </div>
                    )}
                  </span>

                  {/* 보낸 시간 및 삭제 버튼 배치 */}

                  <button
                    onClick={() => {
                      setSelectedMessageId(message.id)
                      setShowDeleteModal(true)
                    }}
                    className={`text-red-500 hover:text-red-700 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 flex">
            <input
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleUploadMedia}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 mr-2 btn-color1 text-white rounded"
            >
              <Image src="/img.png" alt="사진" width={20} height={20} />
            </button>
            <input
              type="text"
              maxLength={300}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-2 border rounded text-right"
              placeholder="메시지를 입력하세요 (최대 300자)"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 btn-color2 text-white rounded"
            >
              &#x27A4;
            </button>
          </div>
        </div>
      </div>
      <MessageModal
        show={showDeleteModal}
        handleMessage={confirmDeletion}
        message="이 메시지를 삭제하시겠습니까?"
        actionLabel="삭제"
      />
      <MessageModal
        show={showFileModal}
        handleMessage={confirmFileUpload}
        message="파일을 전송하겠습니까?"
        actionLabel="전송"
      />

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

export default ChatArea
