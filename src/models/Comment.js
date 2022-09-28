const { Schema, model } = require('mongoose');

const schema = new Schema({
  _id: {
    type: String
  },
  date: {
    type: Date,
    default: true
  },
  body: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    ref: 'User',
    require: true
  },
  noticeId: {
    type: String,
    ref: 'Notice',
    require: true
  },
  isRemove: {
    type: Boolean,
    default: false
  }
},{
  _id: false
});

module.exports = model('comment', schema);