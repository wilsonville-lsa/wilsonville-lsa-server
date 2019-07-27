const express = require('express');
const app = express();
const { handler } = require('./middleware/error');

app.use(express.json());

app.use('/contact', require('./routes/contact'));

app.use(handler);

module.exports = app;
