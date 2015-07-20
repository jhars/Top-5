// test.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String,	
  username: String
});

var List = mongoose.model('List', ListSchema);

module.exports = List;