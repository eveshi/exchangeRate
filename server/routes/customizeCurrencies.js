const createError = require('http-errors');
const express = require('express');

const CustomizeCurrency = require('../model/customizeCurrency');

const router = express.Router();

// Create new CustomizeCurrency with user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.customizeCurrency) {
      next(createError(400, 'bad_request'));
    }

    await CustomizeCurrency.create(req.body.CustomizeCurrency, (err) => {
      next(err);
    });

    res.json({
      message: 'post customizeCurrency successfully',
    });
    return;
  } catch (error) {
    next(error);
  }
});

// Read CustomizeCurrencys
router.get('/', async (req, res, next) => {
  try {
    if (!req.body.email) {
      next(createError(400, 'bad_request'));
    }

    await CustomizeCurrency.findOne(
      { email: req.body.email },
      (err) => {
        next(err);
      },
    );

    res.json({
      message: 'get customizeCurrencys successfully',
    });
    return;
  } catch (error) {
    next(error);
  }
});

// Update old CustomizeCurrency
router.patch('/', async (req, res, next) => {
  try {
    if (!req.body.email ||
        !req.body.customizeCurrencys) {
      next(createError(400, 'bad_request'));
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
    return;
  } catch (error) {
    next(error);
  }
});

// Delete CustomizeCurrencys with user
router.delete('/', async (req, res, next) => {
  try {
    if (!req.body.email) {
      next(createError(400, 'bad_request'));
    }

    await CustomizeCurrency.deleteOne(
      { email: req.body.email },
      (err) => {
        next(err);
      },
    );

    res.json({
      message: 'post CustomizeCurrency successfully',
    });
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
