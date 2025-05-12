const mongoose = require('mongoose');
const User = require("../models/User");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  ],
  messages: [
    {
      sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true,
      },
      text: { 
        type: String, 
        required: true, 
      },
      timestamp: { 
        type: Date, 
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
