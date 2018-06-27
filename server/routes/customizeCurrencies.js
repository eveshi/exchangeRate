const createError = require('http-errors');
const express = require('express');

const CustomizeCurrency = require('../model/customizeCurrency');

const router = express.Router();

// Create new CustomizeCurrency with user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.customizCurrency) {
      next(createError(400, 'bad_request'));
    }

    await CustomizeCurrency.create(req.body.customizeCurrency, (err) => {
      next(err);
    });

    res.json({
      message: 'post customizeCurrency successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Read CustomizeCurrencys
router.get('/', async (req, res, next) => {
  try {
    if (!req.body.email) {
      next(createError(400, 'Bad request. Email not found.'));
    }

    await CustomizeCurrency.findOne(
      { email: req.body.email },
      (err) => {
        next(err);
      },
    );

    // get what?????????????
    res.json({
      message: 'get customizeCurrencys successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Update old CustomizeCurrency
router.patch('/', async (req, res, next) => {
  try {
    if (!req.body.email ||
        !req.body.customizeCurrencys) {
      next(createError(400, 'Bad Request. Email or currencies not found.'));
    }

    await CustomizeCurrency.updateOne(
      { email: req.body.CustomizeCurrency.email },
      { CustomizeCurrencys: req.body.CustomizeCurrencys },
      (err) => {
        next(err);
      },
    );

    res.json({
      message: 'delete customizeCurrency successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Delete CustomizeCurrencys with user
router.delete('/', async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw createError(400, 'bad_request');
    }

    await CustomizeCurrency.deleteOne({ email: req.body.email });

    res.json({
      message: 'post CustomizeCurrency successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
