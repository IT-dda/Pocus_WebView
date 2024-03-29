const $btn_power_off = document.querySelector('.btn_power_off');
const notiTime = document.querySelector('input[name=notiTime]').value;
const DEFAULT_TIME = 20;
const NOTI_TITLE = '🔔 스트레칭 알림';
const NOTI_ICON = '/image/exercising.png';
const NOTI_MSG =
  '올바른 자세를 유지하고 계신가요? 스트레칭 할 시간입니다. 자리에서 일어나주세요!';
const STRETCHING_LINK = 'https://youtu.be/fFIL0rlRH78';
const NOTI_TIME = notiTime ? notiTime : DEFAULT_TIME; // min
const BEEP_SOUND = '/sound/beepSound.mp3';

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
  setInterval(() => {
    notify();
  }, 1000 * 60 * NOTI_TIME);
};

const notify = () => {
  if (Notification.permission !== 'granted') {
    alert('notification is disabled');
  }

  const audio = new Audio(BEEP_SOUND);
  audio.play();
  let notification = new Notification(NOTI_TITLE, {
    icon: NOTI_ICON,
    body: NOTI_MSG,
  });

  notification.onclick = () => window.open(STRETCHING_LINK);
};

const upper_pred = () => {
  setInterval(() => {
    notify_upper();
  }, 5000);
};

window.onload = () => {
  if (!window.Notification || !NOTI_TIME) {
    return;
  }

  Notification.requestPermission();
  calculate();
};
$btn_power_off.addEventListener('click', () => powerOffAlert());
