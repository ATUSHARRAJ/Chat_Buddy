const express = require("express");
const http = require("http"); 
const socketIo = require("socket.io");
const app = express();
const cors = require("cors");

const Conversation = require("./models/Conversation");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",  // Allow connections from your frontend (React app)
    methods: ["GET", "POST"],
    credentials: true  // Allow cookies, if you need them
}));

// Database connection (Ensure this is correct in your ./config/database.js)
require("./config/database").dbConnect();

// Import and mount routes
const user = require("./routes/user");
app.use("/api", user);

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
 const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

// WebSocket (Socket.IO) setup: Handle new connections and message events
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on("joinRoom",(data)=>{
        socket.join(data);
        console.log(data);
    });
    socket.on("sendMessages", async (data) => {
        try {
          // Fetch the conversation
          const conversation = await Conversation.findOne({ _id: data.room });
          if (!conversation) {
            console.error("Conversation not found for room:", data.room);
            return;
          }
    
          // Create the new message
          const newMessage = {
            sender: data.sender,
            text: data.text,
            timestamp: Date.now(),
          };
    
          // Add the message to the conversation
          conversation.messages.push(newMessage);
          await conversation.save(); // Save the updated conversation
    
          // Emit the message to other users in the room
          socket.to(data.room).emit("receiveMessages", newMessage);
          console.log(data.text)
          console.log("Message saved and emitted successfully.");
        } catch (error) {
          console.error("Error handling sendMessages event:", error);
        }
      });
});


// Start the server
server.listen(PORT, () => {
    console.log(`App is Listening At http://localhost:${PORT}`);
});
