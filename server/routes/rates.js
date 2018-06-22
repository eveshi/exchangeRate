const express = require('express');
const createError = require('http-errors');
const axios = require('axios');

const router = express.Router();

const fixRates = (rates) => {
  Object.keys(rates).reduce((acc, currency) => (
    {
      ...acc,
      [currency]: rates[currency].toFixed(2),
    }
  ), {});
};

// Read current
router.get('/', async (req, res, next) => {
  try {
    const currenciesData = await axios.get(`${process.env.LATEST_CURRENCY_URL}${process.env.CURRENCY_USER_SUFFIX}`);

    const rates = { ...JSON.parse(currenciesData).rates };
    const fixedRates = fixRates(rates);

    res.send(fixedRates);
    return;
  } catch (err) {
    next(err);
  }
});

// Read history
router.get('/history/:date', async (req, res, next) => {
  try {
    if (!req.params ||
       !req.params.date) {
      next(createError(400, 'Bad Request'));
    }

    const historyData = await axios.get(`${process.env.LATEST_CURRENCY_URL}${req.params.date}${process.env.CURRENCY_USER_SUFFIX}`);

    const rates = { ...JSON.parse(historyData).rates };
    const fixedRates = fixRates(rates);

    res.send(fixedRates);
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = router;

