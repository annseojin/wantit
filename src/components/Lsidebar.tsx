import React, { useState } from 'react'
import MessageModal from './messageModal'

interface LeftSidebarProps {
  handleLeaveRoom: (room: string) => void // Adjusted to pass room name
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ handleLeaveRoom }) => {
  const [rooms, setRooms] = useState<string[]>(['상대방1', '상대방2'])
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const confirmLeave = (confirmed: boolean) => {
    setShowLeaveModal(false)
    if (confirmed && selectedRoom) {
      handleLeaveRoom(selectedRoom)
      setRooms(rooms.filter((room) => room !== selectedRoom)) // Remove the room from the list
      setSelectedRoom(null) // Reset the selected room state
    }
  }

  return (
    <>
      <div className="w-1/5 bg-white overflow-y-auto border shadow">
        <ul className="divide-y divide-gray-300">
          {rooms.map((room, index) => (
            <li
              key={index}
              className="p-4 flex justify-between hover:bg-gray-50 cursor-pointer"
            >
              {room}
              <button
                onClick={() => {
                  setShowLeaveModal(true)
                  setSelectedRoom(room)
                }}
                className="text-red-500 hover:text-red-700"
              >
                나가기
              </button>
            </li>
          ))}
        </ul>
      </div>
      <MessageModal
        show={showLeaveModal}
        handleMessage={confirmLeave}
        message={`${selectedRoom}님과의 채팅방을 나가시겠습니까?`}
        actionLabel="나가기"
      />
    </>
  )
}

export default LeftSidebar
