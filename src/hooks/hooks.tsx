export interface Product {
  title: string
  content: string
  name: string
  imageSrc: string
  imageAlt: string
  price: string
  save?: string
  category: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export interface MessageModalProps {
  show: boolean
  handleMessage: (confirmed: boolean) => void
  message: string
  actionLabel: string
}

export interface ProductListProps {
  products: Product[]
  handleSaveClick: (product: Product) => void
}

export interface ChatAreaProps {
  messages: Message[]
  sendMessage: (text: string) => void
  sendMedia: (file: File) => void
  input: string
  setInput: (input: string) => void
  isInitialLoad: boolean
  deleteMessage: (id: number) => void
}

export interface Message {
  id: number
  text: string
  sender: string
  name: string
  profileImg: string
  imageUrl?: string
}

export const products: Product[] = [
  {
    title: '하얀 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '하얀 반팔티',
    price: '10,000원',
    save: '찜하기',
    category: 'clothes',
  },
  {
    title: '검은티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
    category: 'clothes',
  },
  {
    title: '교재 팝니다',
    content: '상품에 대한 설명입니다.',
    name: '정보처리기사',
    imageSrc: '/book.jpg',
    imageAlt: '책',
    price: '10,000원',
    save: '찜하기',
    category: 'book',
  },
  {
    title: '회색 반팔티 팝니다',
    content: '상품에 대한 설명입니다.',
    name: 'Basic Tee',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: '검은 반팔티',
    price: '10,000원',
    save: '찜하기',
    category: 'clothes',
  },
  {
    title: '안 쓰는 책 팔아요',
    content: '상품에 대한 설명입니다.',
    name: '수험서',
    imageSrc: '/book.jpg',
    imageAlt: '정처기',
    price: '5,000원',
    save: '찜하기',
    category: 'book',
  },
  {
    title: '테스트용1',
    content: '상품에 대한 설명입니다.',
    name: '기타1',
    imageSrc: '/next.svg',
    imageAlt: '기타1',
    price: '5,000원',
    save: '찜하기',
    category: 'other',
  },
  {
    title: '테스트용2',
    content: '상품에 대한 설명입니다.',
    name: '기타2',
    imageSrc: '/favicon.ico',
    imageAlt: '기타2',
    price: '5,000원',
    save: '찜하기',
    category: 'other',
  },
]
