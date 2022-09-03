require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const urlShortner = require('./api/shortUrl');
const connectDB = require('./db/db');

connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Your first API endpoint
app.use('/api', urlShortner);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
