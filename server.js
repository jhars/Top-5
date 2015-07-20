// require express framework and additional modules
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// Connect to the database you set up
// mongoose.connect("mongodb://localhost/test");
// var User = require('./models/list');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// set up root route to respond with index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

var lists = [
	{
		title: "Greatest Albums of All Time",
		category: "Music",
		itemOne: "Sgt. Pepper's Lonely Hearts Club Band - The Beatles",
		itemTwo: "Pet Sounds - The Beach Boys",
		itemThree: "What’s Going On - Marvin Gaye",
		itemFour: "Enter The Wutang (36 Chamers) - Wu-Tang Clan",
		itemFive: "Thriller - Michael Jackson",
		thumbsUp: 12,
		forks: 6,
		Author: "henryfreel"
	},
	{
		title: "Here is another title",
		category: "some other category",
		itemOne: "Item One",
		itemTwo: "Item Two",
		itemThree: "Item Three",
		itemFour: "Item Four",
		itemFive: "Item Five",
		thumbsUp: 12,
		forks: 6,
		Author: "user's name"
	}
];

app.get('/api/lists', function (req, res) {
	console.log("suck it")
    res.json(lists);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});


