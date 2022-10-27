let sensor = document.querySelector('.sensor_box');
let sensor_1 = document.querySelector('.sensor_1');
let sensor_2 = document.querySelector('.sensor_2');
let sensor_3 = document.querySelector('.sensor_3');
let sensor_4 = document.querySelector('.sensor_4');
let page = document.querySelector('h1');
let userid = document.querySelector('#userid');
const btn = document.querySelector('.btn');

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
  webSocket.send(userid.value);
};

// 2-2) 메세지 수신 이벤트 처리
const NOTIS = [
  '굿굿~',
  '왼쪽 다리 꼰 자세',
  '오른쪽 다리 꼰 자세',
  '양반 다리 자세',
  '잘못된 자세',
];
webSocket.onmessage = function (event) {
  if (event.data.includes(',')) {
    const chars = event.data.split(',');
    for (let i = 0; i < 4; i++) {
      sensor_value(chars[i], i);
    }
    if (page.innerHTML !== 'POCUS VIDEO 📹') {
      if (event.data !== '0,0,0,0') {
        btn.disabled = false;
      }
    }
  } else {
    if (page.innerHTML !== 'POCUS VIDEO 📹') {
      return;
    }

    console.log('pre ' + event.data);
    // console.log(typeof event.data); // string
    if (event.data != 0) {
      if (flag) {
        let pose = NOTIS[event.data];
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

  if (value >= 0 && value < 200) {
    color = '#ffe3e3';
  } else if (value < 400) {
    color = '#ffcccc';
  } else if (value < 600) {
    color = '#ffb5b5';
  } else if (value < 700) {
    color = '#ff9e9e';
  } else if (value < 750) {
    color = '#ff8585';
  } else if (value < 800) {
    color = '#ff6e6e';
  } else if (value < 850) {
    color = '#ff5757';
  } else if (value < 900) {
    color = '#ff4040';
  } else if (value < 950) {
    color = '#ff2929';
  } else if (value < 1024) {
    color = '#ff0000';
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
