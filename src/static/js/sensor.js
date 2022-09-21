let sensor = document.querySelector('.sensor_box');
let sensor_1 = document.querySelector('.sensor_1');
let sensor_2 = document.querySelector('.sensor_2');
let sensor_3 = document.querySelector('.sensor_3');
let sensor_4 = document.querySelector('.sensor_4');
let page = document.querySelector('h1');

// 1. 웹소켓 클라이언트 객체 생성
const webSocket = new WebSocket('ws://localhost:8000');

// 알림
const SS_NOTI_TITLE = '🔔 하체 알림';
const SS_NOTI_ICON = '/image/exercising.png'; // 니중에 꼭 바꾸기
const SS_BEEP_SOUND = '/sound/beepSound.mp3';
// const SS_NOTI_MSG = '잘못된 하체 자세';
let flag = false;

// 2. 웹소켓 이벤트 처리
// 2-1) 연결 이벤트 처리
webSocket.onopen = () => {
  console.log('웹소켓서버와 연결 성공');
};
// 2-2) 메세지 수신 이벤트 처리
webSocket.onmessage = function (event) {
  if (event.data.includes(',')) {
    const chars = event.data.split(',');
    for (let i = 0; i < 4; i++) {
      sensor_value(chars[i], i);
    }
  } else {
    if (page.innerHTML !== 'POCUS VIDEO 📹') {
      return;
    }

    console.log('pre ' + event.data);
    if (event.data !== 'correct') {
      if (flag) {
        let pose = '잘못된 하체 자세';
        switch (event.data) {
          case 'left':
            pose = '왼쪽 다리 꼰 자세';
            break;
          case 'right':
            pose = '오른쪽 다리 꼰 자세';
            break;
          case 'twist':
            pose = '양반 다리 자세';
            break;
        }
        sensor_notify(pose);
        flag = false;
      } else {
        flag = true;
      }
    } else {
      flag = false;
    }
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

function sensor_value(value, index) {
  var color;

  if (value >= 0 && value < 256) {
    color = '#3e75ff';
  } else if (value < 512) {
    color = '#009e63';
  } else if (value < 768) {
    color = '#ffc65c';
  } else if (value < 1024) {
    color = '#f22851';
  }

  switch (index) {
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
      console.log('switch2');
  }
}

function sensor_notify(ss_notification) {
  const audio = new Audio(SS_BEEP_SOUND);
  audio.play();
  let notification = new Notification(SS_NOTI_TITLE, {
    icon: SS_NOTI_ICON,
    body: ss_notification,
  });
}
