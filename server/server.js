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

app.listen(port)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, '../build')))
  .get('/', (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname, '../build/index.html'));
    } catch (err) {
      next(err);
    }
  })
  .use('/users', users)
  .use('/currencies', currencies)
  .use(errorHandling);
