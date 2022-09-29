const { connect } = require('mongoose');

const db = process.env.MONGODB_URI;

connect(db).then(()=>{
  console.log('connected to MongoDB');
}).catch(error => {
  console.log('error connection to MongoDB', error.message);
});