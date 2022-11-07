// let video = document.querySelector('#videoElement');
// if (navigator.mediaDevices.getUserMedia) {
//   navigator.mediaDevices
//     .getUserMedia({ video: true })
//     .then(function (stream) {
//       video.srcObject = stream;
//     })
//     .catch(function (error) {
//       console.log(`Something went wrong! ${error}`);
//     });
// }

(() => {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  const TAKE_PIC_TIME = 10000;
  const width = 640; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  let streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  let video = null;
  let canvas = null;
  let photo = null;
  // let startbutton = null;
  let imgDataInput = null;
  let imgDataForm = null;

  function showViewLiveResultButton() {
    if (window.self !== window.top) {
      // Ensure that if our document is in a frame, we get the user
      // to first open it in its own tab or window. Otherwise, it
      // won't be able to request permission for camera access.
      document.querySelector('.contentarea').remove();
      const button = document.createElement('button');
      button.textContent = 'View live result of the example code above';
      document.body.append(button);
      button.addEventListener('click', () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    // startbutton = document.getElementById('startbutton');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      'canplay',
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      },
      false
    );

    // startbutton.addEventListener(
    //   'click',
    //   (ev) => {
    //     takepicture();
    //     ev.preventDefault();
    //   },
    //   false
    // );
    setInterval(function () {
      takepicture();
    }, TAKE_PIC_TIME);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    const context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    // [seoyeon]
    // console.log(data);1
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  const U_NOTI_TITLE = '🔔 상체 알림';
  const NOTI_ICON = '/image/exercising.png';
  const BEEP_SOUND = '/sound/beepSound.mp3';
  const UPPER_MSG = ' 잘못된 자세가 인식되었습니다. 자세를 바르게 해주세요!';
  function notify_upper(upper) {
    // console.log(UPPER_POSE[upper] + ' 자세가 인식되었습니다.');
    const audio = new Audio(BEEP_SOUND);
    audio.play();
    let notification = new Notification(U_NOTI_TITLE, {
      icon: NOTI_ICON, // 나중에 바꾸기
      body: UPPER_MSG,
    });
  }

  function takepicture() {
    const context = canvas.getContext('2d');

    const formData = new FormData();
    imgDataInput = document.querySelector('#imgData');
    userIdInput = document.querySelector('#userid');

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      imgDataInput.setAttribute('value', data);
      // console.log(imgDataInput.value);
      // imgDataForm.addEventListener('submit', function () {
      //   console.log('imgDataForm 전송 완료?!');
      // });
      // document.imgDataForm.submit();

      formData.append('imgData', imgDataInput.value);
      formData.append('userid', userid.value);
      axios({
        method: 'POST',
        url: '/test4',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // enctype="multipart/form-data"
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.isCorrect > 0) {
            console.log(res.data.isCorrect);
            notify_upper(res.data.isCorrect);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
