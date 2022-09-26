import { Schema, model } from 'mongoose';

const schema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  isRemove: {
    type: Boolean
  }
});

export default model("new", schema);