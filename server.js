// require express framework and additional modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    // config = require('config'),
    session = require('express-session');

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/top-5"
);

// mongoose.connect(config.MONGO_URI);

var List = require('./models/list');
var User = require('./models/user');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  // secret: config.SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {

  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user._id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };
  next();
});

app.get('/api/me', function (req, res){
  User.findOne({_id: req.session.userId}).exec(function(err, user) {
    res.json(user);
  });
});

// set up root route to respond with index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/views/index.html");
});

//  - - - - - - - - LOAD PAGE - - - - - - - //

// Get all Lists
app.get("/api/lists", function (req, res) {

	List.find(function (err, foundLists){
	    res.json(foundLists);
	  });

});

//  - - - - - - - - SIGN UP - - - - - - - //

// user submits the signup form
app.post('/api/users', function (req, res) {

  // grab user data from params (req.body)
  // var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(req.body.email, req.body.username, req.body.password, function (err, user) {
    req.login(user);
    res.send(user);
  });
});

//  - - - - - - - - LOG IN - - - - - - - //

// authenticate user and set session
app.post('/login', function (req, res) {

  // var newUser = req.body.user;

  User.authenticate(req.body.email, req.body.password, function (err, user) {
    req.login(user);
    res.json(user);
    // res.redirect('/');
  });

});

// // user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    res.send('Welcome');
  });
});

// - - - - - - - - - - LOG OUT - - - - - - - - - - //

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//  - - - - - - - - Show Users - - - - - - - //

// user submits the login form
app.get('/api/users', function (req, res) {

	User.find(function (err, foundUsers){
	    res.json(foundUsers);
	  });

});

//  - - - - - - - - EDITTING AND DELETING - - - - - - - //

// Get One List by ID
app.get("/api/lists/:id", function (req, res) {
	var targetId = req.params.id;
	List.findOne({_id: targetId}, function (err, foundList) {
		res.json(foundList);
	});
});

// New Post
app.post("/api/lists", function (req, res) {

  var newList = new List(req.body);

  newList.save(function (err, savedList) {
    res.json(savedList);
  });

});

// Edit List
app.put("/api/lists/:id", function (req, res) {

  var targetId = req.params.id;


  List.findOne({_id: targetId}, function (err, foundList) {

  		foundList.title = req.body.title;
  		foundList.genre = req.body.genre;
  		foundList.date = req.body.date;
  		foundList.itemOne = req.body.itemOne;
  		foundList.itemTwo = req.body.itemTwo;
  		foundList.itemThree = req.body.itemThree;
  		foundList.itemFour = req.body.itemFour;
  		foundList.itemFive = req.body.itemFive;

  		foundList.save(function (err, foundList) {
  		  res.json(foundList);
  		});

  });
});

// Delete List
app.delete("/api/lists/:id", function (req, res) {

  var targetId = req.params.id;

  // find phrase in db by id and remove
  List.findOneAndRemove({_id: targetId}, function (err, deletedList) {
    res.json(deletedList);
  });

});

// listen on port 3000
app.listen("3000", function () {
  console.log("server started on localhost:3000");
});

// app.listen(config.PORT, function () {
//   console.log("server started on localhost:3000");
// });














