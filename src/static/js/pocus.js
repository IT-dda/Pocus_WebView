const $btn_power_off = document.querySelector('.btn_power_off');
const notiTime = document.querySelector('input[name=notiTime]').value;
const NOTI_TITLE = '🔔 스트레칭 알림';
const NOTI_ICON = '/image/exercising.png';
const NOTI_MSG =
  '올바른 자세를 유지하고 계신가요? 스트레칭 할 시간입니다. 자리에서 일어나주세요!';
const NOTI_TIME = notiTime * 1000; // sec (test)
// const NOTI_TIME = notiTime * 1000 * 60; // min

const powerOffAlert = () => {
  Swal.fire({
    icon: 'question',
    title: 'Are you sure you want to exit?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'Cancel',
  }).then((result) => {
    if (!result.isConfirmed) {
      return;
    }
    Swal.fire('Saved!', '', 'success').then((result) => {
      if (!result.value) {
        return;
      }
      location.href = '/mypage';
    });
  });
};

const calculate = () => {
  setTimeout(function () {
    notify();
  }, NOTI_TIME);
};

const notify = () => {
  if (Notification.permission !== 'granted') {
    alert('notification is disabled');
  }

  let notification = new Notification(NOTI_TITLE, {
    icon: NOTI_ICON,
    body: NOTI_MSG,
  });

  notification.onclick = function () {
    window.open('http://google.com'); // TODO: 알림 연결할 링크 선정 필요
  };
};

window.onload = () => {
  if (!window.Notification || !NOTI_TIME) {
    return;
  }
  Notification.requestPermission();
  calculate();
};
$btn_power_off.addEventListener('click', () => powerOffAlert());

// TODO: add audio with notification
// TODO: set default 10 mins
// TODO: notification form validation
