import React from 'react';

function Header(props) {
    const username = props.username;
    const isOnline =props.isOnline;
    return (
        <div className="w-[98%] flex bg-white items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
          <span className="text-sm text-gray-600">
            {username && username[0].toUpperCase()}
          </span>
        </div>
        <div className="w-[20%] mt-2 h-10 text-black text-center font-sans font-medium">
          {username}
        </div>
        <div className="ml-auto text-sm font-medium">
          Status: <span className={isOnline ? "text-green-600" : "text-red-600"}>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    );
}

export default Header;