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


const UserModel = require('./models/User');

// const userProfile = new UserModel({
//   // userEmail: 'aloysiousx@gmail.com',
//   // favoriteImages: [
//   //   {
//   //     title: 'howling wolf',
//   //     date: '2021-05-15',
//   //     explaination: 'stufffffffffffffffffffffff and things',
//   //     url: 'https://zen-varahamihira-8a9600.netlify.app/static/media/wolf-space.1cd72378.jpg',
//   //   }
//   // ],
//   // userEmail: 'matt.santorsola@gmail.com',
//   // favoriteImages: [
//   //   {
//   //     title: 'NGC 602 and Beyond',
//   //     date: '2021-05-16',
//   //     explaination: 'The clouds may look like an oyster, and the stars like pearls, but look beyond. Near the outskirts of the Small Magellanic Cloud, a satellite galaxy some 200 thousand light-years distant, lies 5 million year young star cluster NGC 602. Surrounded by natal gas and dust, NGC 602 is featured in this stunning Hubble image of the region.',
//   //     url: 'https://apod.nasa.gov/apod/image/2105/Ngc602_Hubble_960.jpg',
//   //   }
//   // ]
// });
// userProfile.save().then(() => console.log('successfully saved', userProfile));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('🚀 Hello Fellow Space Cadet');
});

app.post('/insert', async (req, res) => {
  console.log(req.body);

  const { email, title, date, url} = req.body;
  // const newImage = { title, date, url};
  // console.log(newImage);

  const userProfile = await new UserModel({
    userEmail: email,
    favoriteImages: [
      {
        title,
        date,
        url,
      }
    ],
  }).save();
  console.log('successfully saved', userProfile);
  res.send('🚀 Hello Fellow Space Cadet');
});

app.get('/userdata', (req, res) => {
  UserModel.find((arr,userData) => {
    res.send(userData)
  });
});

// app.get();

console.log('❤️ Hello sPaCe CaDeTs welcome to the back-end! ❤️');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
