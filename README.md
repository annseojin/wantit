###**전체 페이지 적용**

- **`Navbar`** | 페이지 위 영역
- **`Footer`** | 페이지 아래 영역
- **`UpButton`** | 스크롤 시 우측 하단 버튼 생성

---

###4/16
채팅 왼쪽 파일클릭 후 전송 시 이미지, 비디오 파일 업로드 가능

###4/18
폴더 내부 정리 및 코드 정리

###4/23
찜 페이지 기능 추가 및 구성 변경

###4/19
signup 페이지 각 항목들에 대한 유효성 검사 일부 구현

> 비밀번호, 전화번호, 동의여부 안 되면 안 넘어가게

---

**`Navbar`** 우측 로그인 버튼 배치

버튼 클릭 시 로그인 모달창 띄움( **`LoginModal`** 컴포넌트)

---

**`Navbar`** 아래 **`Menu`** 컴포넌트 배치

**`Menu`** 코드 안 **`Search`** 컴포넌트 배치

푸터 위 영역 **`PageButton`** 컴포넌트 배치

---

### **Product 페이지**

**`Menu`**, **`PageButton`** 컴포넌트 배치

```
interface Product {
  title: string
  content: string
  name: string
  imageSrc: string
  imageAlt: string
  price: string
  save: string
}

const products = [{},{}, ...]
```

---

상품 정보 객체 선언하고
임의로 상품 정보가 담긴 영역을 배치해놓음

`{products.map((product) = > ())}`으로 `products` 배열 안에 있는 객체 수만큼 영역 생성

만들어진 상품 카드 영역 이미지와 찜하기 클릭 시
상품 정보가 담긴 모달창이 열림(**`Modal`** 컴포넌트)

**`Modal`** 컴포넌트 안 내용은

**product** 페이지의 `const products` 객체의 내용을
`props`으로 주고

```
const Modal: React.FC<ModalProps> = ({
isOpen,
onClose,
productImage,
productTitle,
productContent,
productName,
productPrice,
})
```

위와 같이 속성값을 전달받아서 모달안에 내용을 반영시킴

---

### **message 페이지**

인풋 기능만 구현
메시지 삭제, 채팅방 나가기, 프로필 클릭 등 기능 추가 예정

---

### **save 페이지**

공간 여백 줄이는 용도로 **`Banner`** 컴포넌트 배치
테이블 형식으로 찜목록 영역 배치

---

> 6주차

**`Search`** 인풋 입력값 쿼리스트링으로 전달 및 디자인 수정
**`LoginModal`** 모달창 투명 버그 수정
**`UpButton`** 페이지 올라가다 멈추는 버그 수정
Signup페이지 추가, message 페이지 채팅 폼 구현

> 로그인 모달 회원가입 버튼 누를 시 페이지 이동 기능 미구현
> 채팅 일부 동작(채팅 입력, 메시지 삭제, 채팅목록 삭제) 구현
> 코드가 난잡해서 정리해서 다시 올릴 예정

material UI, headless UI 패키지 설치

### UI 컴포넌트 사이트

[테일윈드UI](https://tailwindui.com/)

[플로우바이트](https://flowbite.com/)

[머티리얼UI](https://mui.com/)
