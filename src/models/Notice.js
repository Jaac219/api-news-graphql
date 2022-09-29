const { Schema, model } =  require('mongoose');

const collectionName = "notice";

const schema = new Schema({
  _id: {
    type: String
  },
  title: {
    type: String, 
    require: true,
    unique: true
  },
  body: {
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    ref: 'User',
    require: true
  },
  isRemove: {
    type: Boolean,
    default: false
  }
},{
  collection: collectionName,
  _id: false
});

module.exports = model(collectionName, schema);