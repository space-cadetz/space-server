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

// const userProfile = new User({
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
//   //     explanation: 'The clouds may look like an oyster, and the stars like pearls, but look beyond. Near the outskirts of the Small Magellanic Cloud, a satellite galaxy some 200 thousand light-years distant, lies 5 million year young star cluster NGC 602. Surrounded by natal gas and dust, NGC 602 is featured in this stunning Hubble image of the region.',
//   //     url: 'https://apod.nasa.gov/apod/image/2105/Ngc602_Hubble_960.jpg',
//   //   }
//   // ]
// });
// userProfile.save().then(() => console.log('successfully saved', userProfile));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('🚀 Hello Fellow Space Cadet');
});

// app.get('/userdata', (req, res) => {
//   User.find((arr, userData) => {
//     res.send(userData);
//   });
// });

app.get('/user', (req, res) => {
  console.log('request :', req.query);
  User.find({ userEmail: req.query.userEmail }, (err, databaseResults) => {
    console.log('data base results', databaseResults);
    res.send(databaseResults);
  });
});

app.post('/user', (req, res) => {
  console.log('====', req.body);
  //Check if user exists
  User.find({ userEmail: req.body.email }, (err, databaseResults) => {
    console.log('before if', databaseResults);
    if (databaseResults.length < 1) {
      res.status(400).send('Error: user not found');

      //If user is not there create a new user
      let newUser = new User({
        userEmail: req.body.userEmail,
        favoriteImages:
          [{
            title: req.body.title,
            date: req.body.date,
            url: req.body.url,
          }],
      });
      newUser.save().then(newUserData => {
        res.send(newUserData.favoriteImages);
      });
    } else {
      console.log('inside else');
      //If user is found, add favorite images info to that user
      let foundUser = databaseResults[0];
      foundUser.favoriteImages.push({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url,
      });
      foundUser.save().then((databaseResults) => {
        console.log(databaseResults);
        res.send(databaseResults.favoriteImages);
      });
    }
  });
});

// app.put('/images/:id', (req, res) = {
//   User.find({ email: req.body.userEmail }, (err, databaseResults) => {
//     let user = databaseResults[0];
//     let favImageId = req.params.id;
//     user.favoriteImages.forEach((image => {
//       if(`${image._id}` === favImageId) {

//       }
//     })

// } 

console.log('❤️ Hello sPaCe CaDeTs welcome to the back-end! ❤️');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
