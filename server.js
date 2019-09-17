const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.json');

mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoClusterName}.mongodb.net/formative?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

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

app.post('/users', function(req, res) {
  User.findOne({ username: req.body.username }, function (err, checkUser) {
        if(checkUser){
            res.send('user already exists');
        } else {
            const hash = bcrypt.hashSync(req.body.password);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fullName: req.body.fullName,
                username: req.body.username,
                password: hash,
                email: req.body.email
            });
            // Save user in database
            user.save().then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        }
    });
});

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
