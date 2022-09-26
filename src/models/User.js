import { Schema, model } from 'mongoose';

const schema = new Schema({
  user_name: {
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
  adress: {
    type: Object
  },
  isRemove: {
    type: Boolean
  }
});

export default model("user", schema);