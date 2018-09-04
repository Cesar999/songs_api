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

app.get('/x', (req, res) => {
   db.collection('songs')
    .find({})
    .toArray()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        console.log('Unable to fetch', err);
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
    console.log(song);
    console.log('song remove from db');
    res.sendStatus(201);
  });
});

// update a document to the DB collection recording the click event
app.put('/update', (req, res) => {
  const new_song = {
    name: req.body.new_name,
    artist: req.body.new_artist,
    rate: req.body.new_rate,
  }
  const old_song = {
    name: req.body.old_name,
    artist: req.body.old_artist,
    rate: req.body.old_rate,
  }
  db.collection('songs').findOneAndUpdate(old_song, {$set: new_song},(err, result) => {
    if (err) {
      return console.log(err);
    }
    console(new_song);
    console.log('song update from db');
    res.sendStatus(201);
  });
});

