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

// please get rid of code like this instead of leaving it as comments!

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('🚀 Hello Fellow Space Cadet');
});

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
  User.find({ userEmail: req.body.email}, (err, databaseResults) => {
    console.log(databaseResults);
    console.log(req.body.email);
    if (databaseResults.length < 1) {
      // res.status(400).send('Error: user not found');

      //If user is not there create a new user
      let newUser = new User({
        userEmail: req.body.email,
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
      let foundUser = databaseResults[0];
      // let user = userData[0];
      let flag = false;

      for (let i=0; i < foundUser.favoriteImages.length; i++) {
        if (foundUser.favoriteImages[i].url === req.body.url) flag = true;
      }
      // no need for the === true
      // also, instead of the loop, you could use something like
      // if(foundUser.favoriteImages.find(img => img.url === req.body.url))
      if (flag) {
        console.log('image already saved to database');
        res.send(foundUser.favoriteImages);
      } else {
        foundUser.favoriteImages.push({
          title: req.body.title,
          date: req.body.date,
          url: req.body.url,
        });
        foundUser.save().then((databaseResults) => {
          console.log('image not in database', databaseResults);
          res.send(databaseResults.favoriteImages);
        });
      }
    }
  });
});

app.delete('/user/:id', (req, res) => {
  console.log('delete called');
  let userEmail = req.query.userEmail;
  User.find({ userEmail: userEmail }, (err, userData) => {
    let user = userData[0];
    user.favoriteImages = user.favoriteImages.filter(image => `${image._id}` !== req.params.id);
    user.save().then(userData => {
      res.send(userData.favoriteImages);
    });
  });
});

console.log('❤️ Hello sPaCe CaDeTs welcome to the back-end! ❤️');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
