// test.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
  title: String,	
  date: String,
  genre: String,
  itemOne: String,
  itemTwo: String,
  itemThree: String,
  itemFour: String,
  itemFive: String,
  thumbsup: Number,
  forks: Number,
  author: String
});

var List = mongoose.model('List', ListSchema);

module.exports = List;