import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // 백엔드 서버 주소

export interface Product {
  title: string;
  content: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  save?: string;
  category: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export interface MessageModalProps {
  show: boolean;
  handleMessage: (confirmed: boolean) => void;
  message: string;
  actionLabel: string;
}

export interface ProductListProps {
  products: Product[];
  handleSaveClick: (product: Product) => void;
}

export interface ChatAreaProps {
  messages: Message[];
  sendMessage: (text: string) => void;
  sendMedia: (file: File) => void;
  input: string;
  setInput: (input: string) => void;
  isInitialLoad: boolean;
  deleteMessage: (id: number) => void;
}

export interface Message {
  id: number;
  text: string;
  imageUrl?: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //초기 메세지 수신
    socket.on('initial messages', (initialMessages: Message[]) => {
      setMessages(initialMessages);
      setLoading(false); // 로딩 상태 업데이트
    });

    socket.on('receive message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('message deleted', (id: number) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    });

    return () => {
      socket.off('initial messages');
      socket.off('receive message');
      socket.off('message deleted');
    };
  }, []);

  const sendMessage = (text: string) => {
    const message: Message = {
      id: Date.now(),
      text,
    };
    socket.emit('send message', message);
  };

  const sendMedia = (media: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const message: Message = {
        id: Date.now(),
        text: '',
        imageUrl: reader.result as string,
      };
      socket.emit('send message', message);
    };
    reader.readAsDataURL(media);
  };

  const deleteMessage = (id: number) => {
    socket.emit('delete message', id);
  };

  return { messages, sendMessage, sendMedia, deleteMessage, loading };
};

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
];
