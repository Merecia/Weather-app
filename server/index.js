const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/weather/', router);

app.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`Server is listening on port ${process.env.PORT}....`);
});