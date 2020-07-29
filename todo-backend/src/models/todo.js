const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  completed: Boolean,
  _user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

mongoose.model('todo', todoSchema);
