const $btn_get_start = document.querySelector('.btn_get_start');

document.addEventListener('DOMContentLoaded', function () {
  new TypeIt('#main_tit', {
    strings: ["Let's Focus", 'on Your Study'],
  })
    .delete(10, { delete: 1000 })
    .type('Your Pose!')
    .go();
});

function renderComments() {
  fetch('/data/comments.json')
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('.comment').innerHTML = `
      <h1>${data.tit}</h1>
      <ul class="comment-list">
        <li>
          <h2>${data.articles[0].subtit} 💻</h2>
          <p>${data.articles[0].desc}</p>
        </li>
        <li>
          <h2>${data.articles[1].subtit} 📝</h2>
          <p>${data.articles[1].desc}</p>
        </li>
        <li>
          <h2>${data.articles[2].subtit} 🙆🏻</h2>
          <p>${data.articles[2].desc}</p>
        </li>
      </ul>
      `;
    });
}

function renderRecommand() {
  fetch('/data/recommand.json')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector('.recommand').innerHTML = `
      <h1>${data.tit}</h1>
      <ul class="recommand-list">
        <li>
          <img src="/image/${data.articles[0].img}">
          <p>${data.articles[0].desc}</p>
        </li>
        <li>
          <img src="/image/${data.articles[1].img}">
          <p>${data.articles[1].desc}</p>
        </li>
        <li>
          <img src="/image/${data.articles[2].img}">
          <p>${data.articles[2].desc}</p>
        </li>
      </ul>
      `;
    });
}

// TODO:
// - [ ] 로그인 확인 -> /init
// - [ ] 로그인 미확인 -> /login
$btn_get_start.addEventListener('click', () => (location.href = '/init'));
document.addEventListener('DOMContentLoaded', () => {
  renderComments();
  renderRecommand();
});
