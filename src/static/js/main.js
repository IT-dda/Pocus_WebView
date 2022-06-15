const $btn_get_start = document.querySelector('.btn_get_start');

document.addEventListener('DOMContentLoaded', function () {
  new TypeIt('#main_tit', {
    strings: ["Let's Focus", 'on Your Study'],
  })
    .delete(10, { delete: 1000 })
    .type('Your Pose!')
    .go();
});

// TODO:
// - [ ] 로그인 확인 -> /init
// - [ ] 로그인 미확인 -> /login
$btn_get_start.addEventListener('click', () => (location.href = '/init'));
