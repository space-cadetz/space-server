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
      date: '2021-05-15',
      explaination: 'stufffffffffffffffffffffff and things',
      url: 'https://zen-varahamihira-8a9600.netlify.app/static/media/wolf-space.1cd72378.jpg',
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
