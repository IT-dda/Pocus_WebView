document.querySelector('.login_btn').addEventListener('click', function () {
  let id = document.forms[0].elements[0].value;
  let password = document.forms[0].elements[1].value;
  let inputData = { id: id, password: password };
  ajax_send('http://localhost:8000/login', inputData);

  function ajax_send(url, inputData) {
    let data = JSON.stringify(inputData);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);

    xhr.addEventListener('load', function () {
      let result = JSON.parse(xhr.responseText);
      console.log(result);
      if (result.result === 'fail') {
        document.querySelector('.result').innerHTML = '실패';
      } else {
        document.querySelector('.result').innerHTML = '성공';
      }
    });
  }
});
