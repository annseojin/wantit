import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Search() {
  const router = useRouter()
  const path = usePathname()
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (path === '/product') {
      router.push(`/product?q=${inputValue}`)
    } else if (path.startsWith('/product/')) {
      const categoryName = path.split('/').pop()
      router.push(`/product/${categoryName}?q=${inputValue}`)
    }
    setInputValue('')
  }

  return (
    <div className="bg-white w-4/5 sm:w-1/4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex">
          <div className="relative w-full">
            <input
              type="search"
              name="q"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 
              bg-gray-50 rounded-e-lg border border-gray-200"
              placeholder="상품명 검색"
              value={inputValue}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium 
              h-full text-white btn-color1 rounded-e-lg 
              border"
            >
              <img className="w-4 h-4" src="/magnifier.png" alt="돋보기" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
