'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// require mongoose
const mongoose = require('mongoose');

// hey mongoose, connect to the database at localhost:27017
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User');

const userProfile = new User({
  userEmail: 'aloysiousx@gmail.com',
  favoriteImages: [
    {
      title: 'howling wolf',
      date: '05.20.2021',
      explaination: 'stufffffffffffffffffffffff',
      url: '',
    }
  ]
});

userProfile.save().then(() => console.log('successfully saved'));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('🚀 Hello Fellow Space Cadet');
});

// app.get();


console.log('❤️ Hello sPaCe CaDeTs welcome to the back-end! ❤️');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
