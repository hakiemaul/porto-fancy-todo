var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memoSchema = new Schema ({
  task: {
    type: String,
    required: [true, 'Please enter your task.']
  },
  completed: Boolean,
  tags: [{
    type: String
  }],
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

var Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo;