// productsData.ts

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
    title: '책 팔아요',
    content: '상품에 대한 설명입니다.',
    name: '정보처리기사',
    imageSrc: '/book.jpg',
    imageAlt: '책',
    price: '10,000원',
    save: '찜하기',
    category: 'books',
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
    title: '정처기 필기 팔아요',
    content: '상품에 대한 설명입니다.',
    name: '수험서',
    imageSrc: '/book.jpg',
    imageAlt: '정처기',
    price: '5,000원',
    save: '찜하기',
    category: 'books',
  },
  {
    title: '테스트용1',
    content: '상품에 대한 설명입니다.',
    name: '기타1',
    imageSrc: '/next.svg',
    imageAlt: '정처기',
    price: '5,000원',
    save: '찜하기',
    category: 'others',
  },
  {
    title: '테스트용2',
    content: '상품에 대한 설명입니다.',
    name: '기타2',
    imageSrc: '/favicon.ico',
    imageAlt: '정처기',
    price: '5,000원',
    save: '찜하기',
    category: 'others',
  },
]
