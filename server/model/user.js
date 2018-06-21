const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  stared: {
    type: Array,
    required: true,
  },
},{
  collection: 'user'
})

module.exports = mongoose.model('userModel', userModelSchema)