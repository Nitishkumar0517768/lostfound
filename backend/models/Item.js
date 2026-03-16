const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["lost", "found"],
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    default: "open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
