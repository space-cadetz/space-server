const mongoose = require('mongoose');

const { Schema } = mongoose;

// defining image properties and thier datatypes :
const imageOfTheDaySchema = new Schema({
  title: String,

  // date: {type: Date, default: Date.now},
  date: String,
  explanation: String,
  url: String,
});

// incldes the image schema 
// user is an object that contains an array of book objects
const userSchema = new Schema({

  userName: String,
  userEmail: String,
  // array of activity Schema
  favoriteImages: [imageOfTheDaySchema] 
});

//model of the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
