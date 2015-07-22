// require express framework and additional modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    session = require('express-session');

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/top-5"
);

var List = require('./models/list');
var User = require('./models/user');

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
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

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + "/public"));

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
  var newUser = req.body;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.username, newUser.password, function (err, user) {
    console.log(user);
    res.send(user);
  });
});

//  - - - - - - - - LOG IN - - - - - - - //

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    console.log("--> this is the user");
    console.log(user.email);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    res.send('Welcome ' + user.email);
  });
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
app.listen(process.env.PORT || 3000, function () {
  console.log("server started on localhost:3000");
});


