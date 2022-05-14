document.addEventListener('DOMContentLoaded', function () {
  new TypeIt('#main_tit', {
    strings: ["Let's Focus", 'on Your Study'],
  })
    .delete(10, { delete: 1000 })
    .type('Your Pose!')
    .go();
});
