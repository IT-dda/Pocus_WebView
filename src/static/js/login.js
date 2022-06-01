const $login_btn = document.querySelector('.login_btn');
const $login_result = document.querySelector('.login_result');

$login_btn.addEventListener('click', function () {
  let id = document.forms[0].elements[0].value;
  let password = document.forms[0].elements[1].value;
  let inputData = { id: id, password: password };
  ajax_send('http://localhost:8000/login', inputData);

  function ajax_send(url, inputData) {
    let data = JSON.stringify(inputData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);

    xhr.addEventListener('readystatechange', function () {
      let result = JSON.parse(xhr.responseText);
      console.log(result.result);

      if (result.result === 'fail') {
        $login_result.innerHTML = '로그인 실패';
      } else {
        $login_result.innerHTML = '로그인 성공';
      }
    });
  }
});
