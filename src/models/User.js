const { Schema, model } = require('mongoose');

const schema = new Schema({
  _id: {
    type: String
  },
  userName: {
    type: String,
    require: true,
    unique: true
  }, 
  name: {
    type: String, 
    require: true
  },
  phone: {
    type: String
  },
  address: {
    type: Object
  },
  isRemove: {
    type: Boolean,
    default: false
  }
},{
  _id: false
});

module.exports = model('user', schema);