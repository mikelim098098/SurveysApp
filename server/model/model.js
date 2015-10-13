var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: String,
  created_date: Date,
}, {versionKey: false});

var PollSchema = new mongoose.Schema({
  name: String,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  votes1: {type: Number, default: 0},
  votes2: {type: Number, default: 0},
  votes3: {type: Number, default: 0},
  votes4: {type: Number, default: 0},
  created_at: { type: Date, default: Date.now}
}, {versionKey: false});

mongoose.model('User', UserSchema);
mongoose.model('Poll', PollSchema);
