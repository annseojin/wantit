'use client';

import React, { useEffect, useState } from 'react';
import ChatArea from '@/components/chatArea';
import RightSidebar from '@/components/Rsidebar';
import { useChat } from '@/hooks/hooks';

const ChatPage: React.FC = () => {
  //useChat 훅에서 반환된 값들을 할당
  const { messages, sendMessage, sendMedia, deleteMessage, loading } =
    useChat();
  const [input, setInput] = useState<string>(''); // 입력값을 관리하는 상태
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true); // 초기 로딩 상태를 관리하는 상태

  // 로딩 상태가 변경될 때마다 초기 로딩 상태 업데이트
  useEffect(() => {
    if (!loading) {
      setIsInitialLoad(false);
    }
  }, [loading]);

  const handleLeaveRoom = (room: string) => {
    console.log('Leaving the room:', room);
    // 방을 나가는 로직 추가
  };

  const handleJoinRoom = (room: string) => {
    console.log('Joining the room:', room);
    // 방을 입장하는 로직 추가
  };

  // UI 렌더링
  return (
    <div className="bg-color h-screen flex max-w-7xl mx-auto">
      <ChatArea
        messages={messages}
        sendMessage={sendMessage}
        sendMedia={sendMedia}
        input={input}
        setInput={setInput}
        isInitialLoad={isInitialLoad}
        deleteMessage={deleteMessage}
      />
      <RightSidebar />
    </div>
  );
};

export default ChatPage;
