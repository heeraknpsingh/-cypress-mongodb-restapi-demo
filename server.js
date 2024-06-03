const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


mongoose.connect(process.env.DB_CONNECT).then(
  () => { console.log('Connected to mongodb instance.') },
  err => { console.log(err) }
);

app.use(express.json());

const authRoute = require('./routes/auth')
app.use('/api/user', authRoute)
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})