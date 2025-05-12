import {Link} from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Signup(props) {
     const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
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
        e.preventDefault(); 
        const apiURL = "http://localhost:4000/api/signup"; 

        try {
            const response = await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
              const errorData = await response.json();
              return alert("Signup failed: " + errorData.message);
            }
            navigate('/login');
          }
          
          catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    return (
        <div className="w-[33%] flex-col flex h-fit m-auto border-[3px] border-solid border-black">
        <nav className="text-black w-11/12 flex h-[30%] m-auto flex-row-reverse gap-2 mt-5">
          <button className="bg-blue-950 border-black border-[3px] rounded-[6px] w-[20%] text-white" ><Link to="/login">Login</Link></button>
          <button className="bg-blue-950 border-black border-[3px] rounded-[6px] w-[20%] text-white"><Link to="/signup">Signup</Link></button>
        </nav>
       
        <div className='flex flex-col  m-auto w-11/12 '>
        <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>UserName</label>
        <input onChange={changeHandler} value={data.username} name = "username" className='border-2 rounded-[3px] border-solid border-black' placeholder='UserName' type="text"></input>
            <label>E-mail:</label>
           <input onChange={changeHandler}  value={data.email} name="email" className='border-2 rounded-[3px] border-solid border-black' placeholder='Email Address' type ="email"></input>
           <label>Password:</label>
           <input onChange={changeHandler} value={data.password}  name="password" className='border-2 rounded-[3px] border-solid border-black' placeholder='Password' type="password"></input>  
           <button onSubmit={handleSubmit} className=" mt-[10px] mb-[10px] m-auto bg-blue-950 border-black border-[3px] rounded-[6px] w-[50%] text-white">Signup</button>
        </form >
        </div>
        </div>
    );
}

export default Signup;