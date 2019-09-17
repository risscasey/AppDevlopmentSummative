const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.json');

const Listing = require('./models/listings.js');
const User = require('./models/users');


mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoClusterName}.mongodb.net/digimart?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongo db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use(function(req, res, next){
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', function(req, res){
  res.send('Welcome Digimart, a consumer to consumer platform where you can view, buy and sell items');
});

app.post('/listing', function(req, res){

  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription
  });

  listing.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));

});

<<<<<<< HEAD
app.get('/allListings', function(req, res) {
  Listing.find().then(result => {
    res.send(result);
  });
});
=======
app.get('/allListings', function(req, res){
  Listing.find().then(result => {
    console.log(result);
    res.send(result);
  })
})
>>>>>>> master
// larissa codes untill here

app.post('/users', function(req, res) {
  User.findOne({ username: req.body.username }, function (err, checkUser) {
    if(checkUser){
      res.send('user already exists');
    } else {
      const hash = bcrypt.hashSync(req.body.password);
      const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save().then(data => {
          res.send(data);
      }).catch(err => res.send(err));
    }
  });
});

app.get('/allUsers', function(req, res) {
  User.find().then(result => {
    res.send(result);
  });
});

// Annie codes untill here



// Katherine codes untill here

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
