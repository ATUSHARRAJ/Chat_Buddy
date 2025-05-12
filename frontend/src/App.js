import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login"; 
import Signup from "./Component/Signup"; 
import Chatting from "./Component/Chatting";
// import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App w-full  min-h-screen flex flex-col ">

        
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatting" element={<Chatting/>} />
          
        </Routes>
      
    </div>
  );
}

export default App;
