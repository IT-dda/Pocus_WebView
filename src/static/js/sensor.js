// 1. 웹소켓 클라이언트 객체 생성
const webSocket = new WebSocket('ws://localhost:8000');

// 2. 웹소켓 이벤트 처리
// 2-1) 연결 이벤트 처리
webSocket.onopen = () => {
  console.log('웹소켓서버와 연결 성공');
};
// 2-2) 메세지 수신 이벤트 처리
webSocket.onmessage = function (event) {
  console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
};
// 2-3) 연결 종료 이벤트 처리
webSocket.onclose = function () {
  console.log('서버 웹소켓 연결 종료');
};
// 2-4) 에러 발생 이벤트 처리
webSocket.onerror = function (event) {
  console.log(event);
};
