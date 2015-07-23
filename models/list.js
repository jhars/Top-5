// test.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user');

var ListSchema = new Schema({
  title: String,	
  date: String,
  genre: String,
  itemOne: String,
  itemTwo: String,
  itemThree: String,
  itemFour: String,
  itemFive: String,
  thumbsUp: Number,
  forks: Number,
  author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

var List = mongoose.model('List', ListSchema);

module.exports = List;