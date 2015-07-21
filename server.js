// require express framework and additional modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// Connect to the database you set up
// mongoose.connect("mongodb://localhost/top-5");

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/top-5"
);

var List = require('./models/list');

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

// var lists = [
// 	{
// 		title: "Greatest Albums of All Time",
// 		date: "00/00/0000",
// 		genre: "All",
// 		itemOne: "Sgt. Pepper's Lonely Hearts Club Band - The Beatles",
// 		itemTwo: "Pet Sounds - The Beach Boys",
// 		itemThree: "What’s Going On - Marvin Gaye",
// 		itemFour: "Enter The Wutang (36 Chamers) - Wu-Tang Clan",
// 		itemFive: "Thriller - Michael Jackson",
// 		thumbsUp: 12,
// 		forks: 6,
// 		author: "henryfreel"
// 	},
// 	{
// 		title: "Here is another title",
// 		date: "00/00/0000",
// 		genre: "All",
// 		itemOne: "Item One",
// 		itemTwo: "Item Two",
// 		itemThree: "Item Three",
// 		itemFour: "Item Four",
// 		itemFive: "Item Five",
// 		thumbsUp: 32,
// 		forks: 11,
// 		author: "user's name"
// 	}
// ];

// Get all List
app.get("/api/lists", function (req, res) {

	List.find(function (err, foundLists){
	    res.json(foundLists);
	  });

});

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


