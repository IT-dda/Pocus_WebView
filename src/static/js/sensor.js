let sensor = document.querySelector('.sensor_box');
let sensor_1 = document.querySelector('.sensor_1');
let sensor_2 = document.querySelector('.sensor_2');
let sensor_3 = document.querySelector('.sensor_3');
let sensor_4 = document.querySelector('.sensor_4');

// 1. 웹소켓 클라이언트 객체 생성
const webSocket = new WebSocket('ws://localhost:8000');

// 2. 웹소켓 이벤트 처리
// 2-1) 연결 이벤트 처리
webSocket.onopen = () => {
  console.log('웹소켓서버와 연결 성공');
};
// 2-2) 메세지 수신 이벤트 처리
webSocket.onmessage = function (event) {
  const chars = event.data.split(',');
  for (let i=0; i<4; i++){
    sensor_value(chars[i], i);
  }
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

function sensor_value(value, index){
  var color;
  // switch(value){
  //   case 0:
  //     color = '#3e75ff';
  //     console.log('1-0');
  //     break;
  //   case 256 <= value && value < 512:
  //     color = '#009e63';
  //     console.log('1-1');
  //     break;
  //   case 512 <= value && value < 768:
  //     color = '#ffc65c';
  //     break;
  //   case 768 <= value && value < 1024:
  //     color = '#f22851';
  //     break;
  //   default:
  //     console.log("value:"+value);
  // }

  if(value >= 0 && value < 256){
    color = '#3e75ff';
  }else if(value < 512){
    color = '#009e63';
  }else if(value <768){
    color = '#ffc65c';
  }else if(value < 1024){
    color = '#f22851';

  }

  switch(index){
    case 0:
      sensor_1.style.backgroundColor = color;
      break;
    case 1:
      sensor_2.style.backgroundColor = color;
      break;
    case 2:
      sensor_3.style.backgroundColor = color;
      break;
    case 3:
      sensor_4.style.backgroundColor = color;
      break;
    default:
      console.log("switch2");
  }
}