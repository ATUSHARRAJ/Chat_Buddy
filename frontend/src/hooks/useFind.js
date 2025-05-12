import { useEffect, useState } from 'react';

const useFind = (email) => {
  
  const [user1Id, setUser1Id] = useState(null); // Initial state set to null
  const [username , setUsername]=useState("");
  const apiURL = "http://localhost:4000/api/findId";
  async function fetchUserId(email) {
    try {
      const response = await fetch(`${apiURL}?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert("Login failed: " + errorData.message);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      setUser1Id(responseData.UserId);
      setUsername(responseData.username);
      alert(`User ID: ${responseData.UserId}`);

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  }
 console.log(email);
 console.log(user1Id);
 console.log(username);

  return { user1Id,fetchUserId,setUser1Id,setUsername,username };  // Return user1Id so it can be used in the component
};

export default useFind;
