'use client'
import React, { useState, useEffect } from 'react'

const UpButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false) // 스크롤 중인지 여부를 나타내는 상태 변수

  // 페이지가 일정 간격 이상 스크롤되면 버튼을 표시
  const toggleVisibility = () => {
    if (!isScrolling && window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // 스크롤 이벤트
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [isScrolling])

  // 페이지를 위로 스크롤하는 함수
  const scrollToTop = () => {
    if (!isScrolling) {
      setIsScrolling(true) // 스크롤이 시작됨을 나타내는 상태를 true로 설정
      const scrollStep = -window.scrollY / 25 // 스크롤 간격을 계산
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep) // window.scrollBy를 사용하여 스크롤을 부드럽게 이동
        } else {
          clearInterval(scrollInterval)
          setIsScrolling(false) // 스크롤이 끝났음을 나타내는 상태를 false로 설정
        }
      }, 20) // 스크롤 간격(ms)
    }
  }

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-10 
          bg-black hover:bg-slate-700 text-white
           font-semibold rounded-full shadow-lg
           sm:px-3 py-6 md:py-3 px-2"
        >
          ▲ TOP
        </button>
      )}
    </div>
  )
}

export default UpButton
