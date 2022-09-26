import { connect } from 'mongoose';

const db = process.env.MONGODB_URI || `mongodb://localhost:27017/practice`;

connect(db).then(()=>{
  console.log('connected to MongoDB');
}).catch(error => {
  console.log('error connection to MongoDB', error.message);
});