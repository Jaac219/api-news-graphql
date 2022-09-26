import { Schema, model } from 'mongoose';

const schema = new Schema({
  date: {
    type: Date.now,
    default: true
  },
  body: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  newId: {
    type: Schema.Types.ObjectId,
    ref: 'New',
    require: true
  },
  isRemove: {
    type: Boolean,
    default: false
  }
});

export default model('comment', schema);