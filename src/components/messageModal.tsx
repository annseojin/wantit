import React from 'react'

interface MessageModalProps {
  show: boolean
  handleMessage: (confirmed: boolean) => void
  message: string
  actionLabel: string
}

const MessageModal: React.FC<MessageModalProps> = ({
  show,
  handleMessage,
  message,
  actionLabel,
}) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p className="py-6 font-semibold">{message}</p>
            <div className="flex justify-evenly mt-4">
              <button
                onClick={() => handleMessage(false)}
                className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={() => handleMessage(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageModal
