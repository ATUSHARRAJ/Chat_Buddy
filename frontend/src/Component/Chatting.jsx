import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import useFind from '../hooks/useFind';


function Chatting(props) {
  const location = useLocation();
  const user2Id = location.state.user2Id;
  const connected= location.state.connected;
  
  // console.log( "user2id" ,user2Id);
  console.log(connected);
  
  const [data, setData] = useState({
    email: "",
  });

  function changeHandler(e) {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  const {user1Id,fetchUserId , setUser1Id , setUsername,username} =useFind(data.email);
  // console.log(user1Id);
  function handleSelect(e,f){
    setUser1Id(e);
    setUsername(f)

}
  function extract(e)  {
    e.preventDefault(); 
    fetchUserId(data.email); 
    setUser1Id(user1Id);
  };
  
  return (
    <div className=" flex flex-col gap-2">
      <form className=" m-auto w-11/12 flex flex-row justify-evenly" onSubmit={extract}>
        <div>Welcome to Chat-Buddy</div>
        <div className="flex gap-3">
          <input
            onChange={changeHandler}
            value={data.email}
            className="border-black border-[3px] rounded-[6px] p-2"
            name="email"
            type="email"
            placeholder="Search by E-mail"
          />
          <button>
          <Flex gap="small" vertical>
          <Flex wrap gap="small">
          <Button
            onSubmit={extract}
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg h-[100%] flex justify-center"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          </Flex>
          </Flex>
          </button>
        </div>
      </form>

     <div className="h-[80vh] flex w-full m-auto justify-center">
      <LeftContainer connected ={connected}  onSelect ={handleSelect} />
     <RightContainer user1Id={user1Id} user2Id={user2Id} username={username}/></div>
    </div>
  );
}

export default Chatting;
