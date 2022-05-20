'use strict';

const app = require('../app');
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server start! port number: ${PORT}`);
});
