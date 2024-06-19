import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = express(); // Express 애플리케이션 생성
const httpServer = http.createServer(app); // Express 애플리케이션을 기반으로 HTTP 서버 생성
const io = new Server(httpServer, {
  cors: {
    origin: '*', // 클라이언트가 접근할 수 있도록 허용할 도메인
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
  },
}); // HTTP 서버를 기반으로 Socket.IO 서버 생성, CORS 설정 추가

app.use(cors()); // Express 애플리케이션에 CORS 미들웨어 적용

/*app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/message', 'page.tsx'));
});*/

// 메시지의 형식을 정의한 인터페이스
interface Message {
  id: number; // 메시지 ID
  text: string; // 메시지 텍스트
  imageUrl?: string;
}

let messages: Message[] = []; // 전체 메시지 저장소

// 클라이언트와의 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
  console.log('A user connected'); // 새로운 사용자가 연결되었음을 콘솔에 출력

  // 초기 메시지 전송
  socket.emit('initial messages', messages);

  // 메시지 수신 및 브로드캐스트
  socket.on('send message', (msg: Message) => {
    messages.push(msg);
    io.emit('receive message', msg);
  });

  // 메시지 삭제
  socket.on('delete message', (id: number) => {
    messages = messages.filter((message) => message.id !== id);
    io.emit('message deleted', id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000; // 포트 번호 설정
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // 서버가 시작되었음을 콘솔에 출력
});
