
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  function changeHandler(e) {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const apiURL = "http://localhost:4000/api/login"; // Replace with your API endpoint

    try {
      const response = await fetch(`${apiURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + errorData.message);
        navigate("/signup"); 
        return;
      }
      
      const responseData = await response.json(); 
      console.log(responseData);
      navigate('/chatting', { state: { user2Id: responseData.UserId ,connected:responseData.connected} });
      
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="w-[33%] flex-col flex h- m-auto border-[3px] border-solid border-black">
      <nav className="text-black w-11/12 flex h-[30%] m-auto flex-row-reverse gap-2 mt-5">
        <button className="bg-blue-950 border-black border-[3px] rounded-[6px] w-[20%] text-white">
          <Link to="/signup">Signup</Link>
        </button>
      </nav>

      <form onSubmit={handleSubmit} className="flex flex-col m-auto w-11/12 ">
        <label>E-mail:</label>
        <input
          onChange={changeHandler}
          value={data.email}
          name="email"
          className="border-2 rounded-[3px] border-solid border-black"
          placeholder="Email Address"
          type="email"
        />
        <label>Password:</label>
        <input
          onChange={changeHandler}
          value={data.password}
          name="password"
          className="border-2 rounded-[3px] border-solid border-black"
          placeholder="Password"
          type="password"
        />
        <button className="mt-[10px] mb-[10px] m-auto bg-blue-950 border-black border-[3px] rounded-[6px] w-[50%] text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
