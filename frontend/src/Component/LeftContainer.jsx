// import React from "react";
// import { AudioOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 20,
//       color: '#0000FF',
//     }}
//   />
// );
// const onSearch = (value, _e, info) => console.log(info?.source, value);

// const LeftContainer = (props) => {
//   const connected = props.connected;
//   const onSelect = props.onSelect;
//   function changeHandler(e){
//         const value = e.target.value;
//         connected.filter((val)=>{
             
//         })
//   }

//   return (
//     <div className="flex flex-col min-h-11 w-[20%] border-slate-900 border-4 ">
//         <div className="flex justify-center  mt-2">
//        <Space direction="vertical">
//         <Search
//         onChange={changeHandler}
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{
//         width: 240,
        
//       }}
//     />
//     </Space>
//     </div>


// <div className="mt-4 px-2">
//         {connected && connected.length > 0 ? (
//           connected.map((value, index) => (
//             <div
//               className="flex items-center gap-4 p-2 mb-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:shadow-md"
//               key={index}
//               onClick={() => onSelect(value._id, value.username)}
//             >
//               {/* Avatar */}
//               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
//                 {value.avatar ? (
//                   <img
//                     src={value.avatar}
//                     alt={value.username}
//                     className="w-full h-full rounded-full"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-600">
//                     {value.username[0].toUpperCase()}
//                   </span>
//                 )}
//               </div>

//               {/* Username */}
//               <h1 className="text-sm font-medium text-gray-700">
//                 {value.username}
//               </h1>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 mt-4">No users connected</div>
//         )}
//       </div>



//     </div>
//   );
// };

// export default LeftContainer;


import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const LeftContainer = (props) => {
  const { connected, onSelect } = props;
  const [filteredUsers, setFilteredUsers] = useState(connected || []);

  const onSearch = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = connected.filter((user) =>
      user.username.toLowerCase().includes(lowercasedValue)
    );
    setFilteredUsers(filtered);
  };

  const changeHandler = (e) => {
    const lowercasedValue = e.target.value.toLowerCase(); 
    const filtered = connected.filter((user) =>
      user.username.toLowerCase().includes(lowercasedValue) 
    );
    setFilteredUsers(filtered); 
  };
  

  return (
    <div className="flex flex-col min-h-11 w-[20%] border-slate-900 border-4 bg-gray-100">
      {/* Search Bar */}
      <div className="flex justify-center mt-2">
        <Space direction="vertical">
          <Search
            onChange={changeHandler}
            placeholder="Search users..."
            allowClear
            onSearch={onSearch}
            style={{
              width: 240,
            }}
          />
        </Space>
      </div>

      {/* User List */}
      <div className="mt-4 px-2">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((value, index) => (
            <div
              className="flex items-center gap-4 p-2 mb-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:shadow-md"
              key={index}
              onClick={() => onSelect(value.id, value.username)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
                {value.avatar ? (
                  <img
                    src={value.avatar}
                    alt={value.username}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-sm text-gray-600">
                    {value.username[0].toUpperCase()}
                  </span>
                )}
              </div>

              {/* Username */}
              <h1 className="text-sm font-medium text-gray-700">
                {value.username}
              </h1>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftContainer;
