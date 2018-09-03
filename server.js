console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// serve files from the public directory
app.use(express.static('public'));

// connect to the db and start the express server
let db;

// Replace the URL below with the URL for your database
const url =  'mongodb://localhost:27017/Songs';

MongoClient.connect(url,(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db = client.db('Songs');

  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// add a document to the DB collection recording the click event
app.post('/add', (req, res) => {
  const song = req.body;
  console.log(song);
  db.collection('songs').insertOne(song, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('song added to db');
    res.sendStatus(201);
  });
});

// delete a document to the DB collection recording the click event
app.delete('/delete', (req, res) => {
  const song = req.body;
  db.collection('songs').findOneAndDelete(song, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('song remove from db');
    res.sendStatus(201);
  });
});

// update a document to the DB collection recording the click event
app.put('/update', (req, res) => {
  const song = {
    name: req.body.name,
    artist: req.body.artist,
    rate: req.body.rate,
  }
  const song1 = {
    name1: req.body.name1,
    artist1: req.body.artist1,
    rate1: req.body.rate1,
  }
  db.collection('songs').findOneAndUpdate(song1, {$set: song}, {new: true},(err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('song update from db');
    res.sendStatus(201);
  });
});

