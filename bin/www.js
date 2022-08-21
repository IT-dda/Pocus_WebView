'use strict';

const app = require('../app');
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server start!`);
  console.log(`Connection to http://localhost:${PORT}`);
});
