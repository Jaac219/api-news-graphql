import './src/db.js';
import user from './src/models/User.js';
import express from 'express';

const PORT = process.env.PORT || 3001;
const app = express();

try {
  await user({user_name: 'pepito', name: 'federico'}).save();
} catch (error) {
}



