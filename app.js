// express 가져오기
const express = require('express');
const app = express();
const port = 8000;

app.set(port);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('index', { parameter1: 5, parameter2: '얍' });
});

app.listen(port, () => {
    console.log('8000!');
});
