const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/users');
const currencies = require('./routes/currencies');

const errorHandling = require('./error-handling');

const port = process.env.port || 5000;

mongoose.connect(
  process.env.MONGO_URL,
  (err, next) => {
    next(err);
  },
);

const app = express();
app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  } catch (err) {
    next(err);
  }
});

app.use('/users', users);
app.use('/currencies', currencies);

app.use(errorHandling);
