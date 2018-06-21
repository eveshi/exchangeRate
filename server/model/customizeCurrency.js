const mongoose = require('mongoose');

const currencyModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  currencies: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('currencyModel', currencyModelSchema);
