const mongoose = require('mongoose');
const User  =require("../models/User");
const Conversation = require("../models/Conversation");
const path = require('path'); 
const fs = require('fs');
require("dotenv").config();

exports.createMessage = async(req , res) =>{
    try {
        const { participant1, participant2, senderId, text } = req.body;
    
        // Validate the required fields
        if (!participant1 || !participant2 || !senderId || !text) {
          return res.status(400).json({ error: 'All fields are required.' });
        }
    
        // Check if the conversation already exists between the participants
        let conversation = await Conversation.findOne({
          participants: { $all: [participant1, participant2] },
        });
    
        // If the conversation doesn't exist, create a new one
        if (!conversation) {
          conversation = new Conversation({
            participants: [participant1, participant2],
            messages: [],
          });
        }
    
        // Add the new message to the conversation
        const newMessage = {
          sender: senderId, // The sender of the message
          text: text, // The content of the message
          timestamp: Date.now(), // Current timestamp for the message
        };
    
        // Push the new message to the messages array
        conversation.messages.push(newMessage);
    
        // Save the updated conversation
        await conversation.save();
    
        // Return the updated conversation as a response
        res.status(200).json({
          message: 'Message created successfully.',
          conversation,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};