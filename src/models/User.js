import { Schema, model } from 'mongoose';

const schema = new Schema({
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
});

export default model('user', schema);