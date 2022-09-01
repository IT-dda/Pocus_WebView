const { SerialPort } = require('serialport');

const portName = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
});

portName.on('open', function () {
  console.log('open serial communication');
  portName.on('data', function (data) {
    console.log(data.toString('utf-8'));
  });
});

module.exports = portName;
