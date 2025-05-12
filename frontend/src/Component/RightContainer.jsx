


import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Spin } from "antd";
import { io } from "socket.io-client";
import useSearch from "../hooks/useSearch";
import Header from "./Header";
import "../index.css";

function RightContainer({ user1Id, user2Id, username }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false); // Online status
  const socket = useRef(null); // Manage socket instance
  const { loading, message, error,setMessage } = useSearch(user1Id, user2Id);
  console.log(error);
  const messageEndRef = useRef(null); // Reference for scrolling to the bottom

  // Scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(()=>{
    setMessages([]);
    setMessage([]);

  },[user1Id , user2Id]);
  // Establish socket connection
  useEffect(() => {
    if (!message?.id) return;

    const room = message.id;
    socket.current = io("http://localhost:4000");

    console.log("Joining room:", room);

    // Join room and listen for messages
    socket.current.emit("joinRoom", room);

    const handleReceiveMessages = (data) => {
      console.log("Received message:", data);
      const newMessage = {
        id: data.id || Date.now(), // Add unique ID for messages
        message: data.text,
        sender: data.sender,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleUserOnlineStatus = (status) => {
      console.log("User status updated:", status);
      setIsOnline(status === "online");
    };

    socket.current.on("receiveMessages", handleReceiveMessages);
    socket.current.on("userStatus", handleUserOnlineStatus);

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.off("receiveMessages", handleReceiveMessages);
        socket.current.off("userStatus", handleUserOnlineStatus);
        socket.current.disconnect();
      }
    };
  }, [message?.id]);

  const changeHandler = (e) => setInput(e.target.value);

  const submit = (e) => {
    e.preventDefault();
    if (!message?.id || input.trim() === "") return;

    const room = message.id;
    const newMessage = {
      id: Date.now(), // Unique ID for the message
      message: input,
      sender: user2Id,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("Sending message to room:", room);

    socket.current.emit("sendMessages", { text: input, room, sender: user2Id });
    setInput("");
  };

  return (
    <div className="border-slate-900 bg-slate-900 border-4 w-[70%] relative">
      {/* Header Section */}
      {
        username ?<Header username={username} isOnline={isOnline}/>:<div className="text-white">Connect to user</div>
      }
      

      {/* Messages Section */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="mb-4 image overflow-y-scroll overflow-hidden max-h-[82%]">
            {/* Render server-side messages */}
            {message?.message &&
              message.message.map((msg) => (
                <div
                  key={msg.id}
                  className={`w-11/12 flex m-auto rounded ${
                    msg.sender === user2Id ? "justify-end" : ""
                  }`}
                >
                  <div
                    className={`w-fit my-1 p-2 min-w-10 text-center rounded text-black ${
                      msg.sender === user2Id ? "bg-green-700" : "bg-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
               <div ref={messageEndRef} />

            {/* Render client-side messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`w-11/12 flex m-auto rounded ${
                  msg.sender === user2Id ? "justify-end" : ""
                }`}
              >
                <div
                  className={`w-fit my-1 p-2 min-w-10 text-center rounded text-black ${
                    msg.sender === user2Id ? "bg-green-700" : "bg-white"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Section */}
          <form
            className="flex absolute left-0 bottom-0 w-full bg-gray-200"
            onSubmit={submit}
          >
            <Input
              value={input}
              onChange={changeHandler}
              placeholder="Type a message"
              className="flex-1 mr-2"
              disabled={!message?.id}
              onPressEnter={(e) => {
                e.preventDefault();
                submit(e);
              }}
            />
            <Button
              type="primary"
              danger
              htmlType="submit"
              disabled={!input.trim()}
            >
              Send
            </Button>
          </form>
        </>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}

export default RightContainer;
