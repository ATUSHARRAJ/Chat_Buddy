const mongoose = require('mongoose');
const User =require("../models/User");
const Conversation = require("../models/Conversation");
const path = require('path'); 
const fs = require('fs');


require("dotenv").config();
  
exports.signup = async (req, res) => {
  const { username, password, email } = req.body; // Use 'Username' instead of 'username'

  try {
      // Check if user already exists
      // const existingUser = await User.findOne({ email} || {username});
      const existingUser = await User.findOne({
        $or: [
          { email: email },
          { username: username }
        ]
      });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Save the user
      const newUser = new User({ username, password, email }); // Save 'Username' (uppercase)
      await newUser.save();

      res.status(201).json({
          message: "User signed up successfully",
          userId: newUser._id,
          username: newUser.username,  // This matches the schema field
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

  
exports.login = async(req, res) =>{
  try{
        const{email , password} = req.body;

        const user = await User.findOne({email});

      if(!user){
          return res.json({
              success:false,
              message:"Sign Up first"
          })
      }
      
      const conversation = await Conversation.find({ participants: user._id })
  .populate("participants", "username _id");  
  
        
  // const filteredUsernames = conversation.map(curr => 
  //   curr.participants
    
  //     .filter(participant => participant.username !== user.username)
      
      
  // ).flat();

 console.log(user);
  const filteredUsernames1 = conversation.flatMap(item =>
    item.participants.map(participant => ({
      id: participant._id,
      username: participant.username
    }))
  );
  const filteredUsernames = filteredUsernames1.filter((val) => {
    return val.id.toString() !== user._id.toString();

  });
  
  


      if(password===user.password){
          return res.json({
              success:true,
              data:conversation,
              UserId:user._id,
              connected:filteredUsernames
          })
      }
  }
  catch(error){
     console.log(error);
          return res.json({
             error:error,
             success:false
          })
  }
}
exports.findId = async(req,res)=>{
  try{
    const{email}=req.query;
    const find = await User.findOne({email});
    if(!find){
      return res.json({
        message:"User Not Exixt"
      })
    } 
    
    const UserId = find._id;
    console.log(UserId);
    console.log(find.username)
    return res.json({
      success:true,
      UserId:UserId,
      username:find.username
    })
  }
  catch(error){

  }
}
exports.conversation = async(req,res)=>{
  try {
    const { participant1, participant2 } = req.query; // Extracting the participant IDs from query parameters

    if (!participant1 || !participant2) {
      return res.status(400).json({ message: 'Both participant IDs are required' });
    }

    // Check if the participants exist in the User model
    const user1 = await User.findById(participant1);
    const user2 = await User.findById(participant2);

    if (!user1 || !user2) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    // Find the conversation where both participants are involved
    let conversation = await Conversation.findOne({
      participants: { $all: [participant1, participant2] },
    });

    if (!conversation) {
      // If conversation doesn't exist, create a new conversation
      conversation = new Conversation({
        participants: [participant1, participant2],
        messages: [], // Empty messages array initially
      });

      // Save the new conversation to the database
      await conversation.save();
    }

    // Return the conversation data (whether new or found)
    return res.json({message:conversation.messages,
      id:conversation._id
    });
  } catch (error) {
    console.error('Error fetching or creating conversation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
