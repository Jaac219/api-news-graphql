import { Schema, model } from 'mongoose';

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
  _id: false
});

export default model("notice", schema);