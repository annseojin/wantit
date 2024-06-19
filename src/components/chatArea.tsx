import React, { useRef, useEffect, useState } from 'react';
import MessageModal from './messageModal';
import Image from 'next/image';
import { ChatAreaProps } from '@/hooks/hooks';

// 커스텀 훅 폴더에서 정의해둔 내용을 불러와서 확인하도록 함
const ChatArea: React.FC<ChatAreaProps> = ({
  messages, // 메시지 페이지에서 prop으로 메시지 배열을 받아옴
  sendMessage,
  sendMedia,
  input,
  setInput,
  isInitialLoad, // 메시지 입력 시 최신 메시지로 스크롤 되도록 초기 상태를 지정해줌
  deleteMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null); // 파일 업로드를 위한 파일 타입 설정 초기 null값
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // 메시지 입력되면
  useEffect(() => {
    if (!isInitialLoad) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // 메시지 변경 시 스크롤을 맨 아래로 이동
    }
  }, [messages, isInitialLoad]);

  const confirmDeletion = (confirmed: boolean) => {
    setShowDeleteModal(false);
    if (confirmed && selectedMessageId !== null) {
      deleteMessage(selectedMessageId); // 메시지 삭제 확인
    }
  };

  // 채팅 입력 시 화면 아래로 자동으로 스크롤되게 설정
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      sendMessage(input);
      setInput('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 0);
    }
  };

  // 채팅에 미디어파일 전송하기
  const handleUploadMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 선택하면 선택된 파일의 첫번째(업로드할 이미지 사진 선택하기) 아니면 null값 처리
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // 파일이 선택되면 파일 표시
      setFileToUpload(file);
      setShowFileModal(true);
    }
  };

  //전송 여부 확인창
  const confirmFileUpload = (confirmed: boolean) => {
    setShowFileModal(false); // 메시지 모달 닫기

    // 파일 업로드를 확인했고 업로드할 파일이 있으면
    if (confirmed && fileToUpload) {
      sendMedia(fileToUpload);
      setFileToUpload(null);
      // 파일 전송 후 스크롤을 맨 아래로 이동
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 0);
    }
  };

  const openImageModal = (imageUrl: string) => {
    // 이미지 주소 받아오기
    setSelectedImage(imageUrl);
    // 이미지 모달 열기
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex-1 p-4">
        <div className="h-full flex flex-col">
          {/* 메시지 표시 영역 */}
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-2">
                <div className="flex flex-col">
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
                          priority // 중요한 이미지에 대해 로딩 우선 순위를 높이기 위해 priority 속성 추가
                        />
                      </div>
                    )}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedMessageId(message.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 hover:text-red-700 text-left"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 및 파일 업로드 영역 */}
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

      {/* 메시지 삭제 확인 모달 */}
      <MessageModal
        show={showDeleteModal}
        handleMessage={confirmDeletion}
        message="이 메시지를 삭제하시겠습니까?"
        actionLabel="삭제"
      />

      {/* 파일 업로드 확인 모달 */}
      <MessageModal
        show={showFileModal}
        handleMessage={confirmFileUpload}
        message="파일을 전송하겠습니까?"
        actionLabel="전송"
      />

      {/* 이미지 모달 */}
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
  );
};

export default ChatArea;
