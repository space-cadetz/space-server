'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('hello world');
});

// app.get();



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
