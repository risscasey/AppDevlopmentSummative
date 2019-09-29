const express = require('express');
const app = express();
const port = 2000;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    console.log(file);
    var filename = file.originalname;
    filename = filename.replace(/\s/g,'');
    // const str = file.filename;
    // str = str.replace(/\s+/g, '');
    cb(null, Date.now() + '-' + filename);
  }
});
const fileFilter = function(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const config = require('./config.json');

const Listing = require('./models/listings.js');
const User = require('./models/users');
const Comments = require('./models/comments.js');
const Responce = require('./models/responce');


mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoClusterName}.mongodb.net/digimart?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongo db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(function(req, res, next){
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', function(req, res) {
  res.send('Welcome Digimart, a consumer to consumer platform where you can view, buy and sell items');
});

// Annie codes untill here

app.post('/listing', upload.single('uploadImage'),function(req, res){
  console.log(req);
  console.log(req.file);
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription,
    user_id: req.body.userId,
    itemImage: req.file.path
  });

  console.log(req.file.path);

  listing.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));

});

app.get('/allListings', function(req, res) {
  Listing.find().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.get('/updateListing/:id', function(req, res){
  const id = req.params.id;
    Listing.findById(id, function(err, listing){

      const newListing = {
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemDescription: req.body.itemDescription,
        itemImage: req.file.path
      };

      Listing.updateOne({ _id : id }, newListing).then(result => {
          res.send(result);
      }).catch(err => res.send(err));
    }).catch(err => res.send('cannot find product with that id'));
});

app.get('/listing/:id', function(req, res){
  const id = req.params.id;
  Listing.findById(id, function (err, listing) {
    res.send(listing);
  });
});

app.get('/allComments/:id', function(req, res){
  const selectedComment = req.params.id;
    Comments.findById(id, function(err, comments) {
      if (comments['user_id'] == req.body.userId) {
        res.send(comments)
      } else {
        res.send('401')
      }
    })
})

// larissa codes untill here

app.delete('/listing/:id', function(req, res) {
    const id = req.params.id;
    Listing.findById(id, function(err, listing) {
      Listing.deleteOne({ _id: id }, function (err) {
          res.send('deleted');
      });
    }).catch(err => res.send('cannot find item with that id'));
});

app.post('/users', function(req, res) {
  User.findOne({ username: req.body.username }, function (err, existingUser) {
    if(existingUser) {
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

app.post('/userLogin', function(req, res){
  User.findOne({ username: req.body.username }, function (err, validateUser) {
    if(validateUser) {
      if(bcrypt.compareSync(req.body.password, validateUser.password)){
        res.send(validateUser);
      } else {
        res.send('invalid password');
      }
    } else {
      res.send('invalid user');
    }
  });
});


// Annie codes untill here

// Add Comment
app.post('/sendComments', function(req, res) {
    const comments = new Comments({
      _id: new mongoose.Types.ObjectId(),
      commentDescription: req.body.commentDescription,
      commentID: req.body.commentID
    });

    comments.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
})

// Get all comments
app.get('/allComments', function(req, res){
    Comments.find().then(result => {
        res.send(result);
    })
})



//Get single comment based on ID
app.post('/allComments/:id', function(req, res){
  const id = req.params.id;
  console.log(id);

  Comments.findById(id, function(err, comments) {
    if (comments['user_id'] == req.body.userId) {
      res.send(comments)
    } else {
      res.send('401')
    }
  })
});

// Katherine codes untill here

// Annies code continues
app.post('/sendResponse', function(req, res) {
    const responce = new Responce({
      _id: new mongoose.Types.ObjectId(),
      responceDescription: req.body.responceDescription
    });

    responce.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
});

app.get('/allResponses', function(req, res) {
  Responce.find().then(result => {
    res.send(result);
  });
});

app.get('/allResponses/:id', function(req, res){
  const id = req.params.id;
  console.log(id);

  Responce.findById(id, function(err, responce) {
    if (responce['user_id'] == req.body.userId) {
      res.send(responce)
    } else {
      res.send('401')
    }
  })

});

app.listen(port, () => {
    // console.clear();
    console.log(`application is running on port ${port}`);
});
