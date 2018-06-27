const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const assert = require('assert');

const users = require('./routes/users');
const currencies = require('./routes/rates');

const errorHandling = require('./error-handling');
const handling404 = require('./404handling');

const port = process.env.port || 5000;

mongoose.connect(process.env.MONGO_URL)
  .catch((err) => {
    assert.ok(err, 'connection failed');
  });

const app = express();

app.listen(port);

app.use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, '../build')))
  .get('/', (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname, '../build/index.html'));
    } catch (err) {
      next(err);
    }
  });

app.use('/users', users)
  .use('/currencies', currencies);

app.use(handling404)
  .use(errorHandling);
