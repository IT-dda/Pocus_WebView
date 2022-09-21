const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
//import { axios } from 'axios';
const axios = require('axios');

const portName = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
});

portName.on('open', function () {
  console.log('open serial communication');
});
const parser = portName.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// WS
const wsModule = require('ws');

module.exports = (server) => {
  const webSocketServer = new wsModule.Server({
    server,
  });

  // connection(클라이언트 연결) 이벤트 처리
  webSocketServer.on('connection', (ws, request) => {
    // 2) 클라이언트에게 메시지 전송
    if (ws.readyState === ws.OPEN) {
      // 연결 여부 체크
      ws.send(`클라이언트 접속을 환영합니다 from 서버`); // 데이터 전송
    }

    parser.on('data', function (data) {
      //
      ws.send(data.toString('utf-8'));
      // axios.get('http://localhost:5000/lower/predict').then((result) => {
      //   console.log(result.data);
      // });

      const val = data.toString('utf-8');

      axios
        .post('http://localhost:5000/lower/predict', {
          values: data.toString('utf-8'),
        })
        .then((result) => {
          //
          ws.send(result.data['prediction']);
          console.log(result.data['prediction'], result.data['params']);
        })
        .catch((error) => {
          console.log(error);
        });
      //console.log(data.toString('utf-8'));
    });

    // 3) 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', (msg) => {
      console.log(`클라이언트에게 수신한 메시지 : ${msg}`);
      ws.send('메시지 잘 받았습니다! from 서버');
    });

    // 4) 에러 처러
    ws.on('error', (error) => {
      console.log(`클라이언트 연결 에러발생 : ${error}`);
    });

    // 5) 연결 종료 이벤트 처리
    ws.on('close', () => {
      console.log(`클라이언트 웹소켓 연결 종료`);
    });
  });
};
