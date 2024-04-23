import React, { useRef, useEffect, useState } from 'react'
import MessageModal from './messageModal'

interface ChatAreaProps {
  messages: Message[]
  sendMessage: (text: string) => void
  sendMedia: (file: File) => void
  input: string
  setInput: (input: string) => void
  isInitialLoad: boolean
  deleteMessage: (id: number) => void
}

interface Message {
  id: number
  text: string
  sender: string
  name: string
  profileImg: string
  imageUrl?: string
}

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
                      <img
                        src={message.imageUrl}
                        alt={message.imageUrl}
                        className="max-w-xs mt-2"
                      />
                    )}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedMessageId(message.id)
                      setShowDeleteModal(true)
                    }}
                    className={`mt-2 text-red-500 hover:text-red-700
                    ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
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
              className="p-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              📎
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
              className="ml-2 p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
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
    </>
  )
}

export default ChatArea
