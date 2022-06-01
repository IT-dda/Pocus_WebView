const $register_btn = document.querySelector('.register_btn');
const $register_result = document.querySelector('.register_result');

$register_btn.addEventListener('click', function () {
  let id = document.forms[0].elements[0].value;
  let password = document.forms[0].elements[1].value;
  let inputData = { id: id, password: password };
  ajax_send('http://localhost:8000/register', inputData);

  function ajax_send(url, inputData) {
    let data = JSON.stringify(inputData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);

    xhr.addEventListener('load', function () {
      let result = JSON.parse(xhr.responseText);
      console.log(result);

      if (result.result === 'fail') {
        console.log('failfailfail');
        $register_result.innerText = '회원가입 실패';
      } else {
        console.log('okokokok');
        $register_result.innerText = '회원가입 성공';
      }
    });
  }
});
