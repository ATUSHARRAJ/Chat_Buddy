import { useEffect, useState } from "react";
const useSearch= (user1Id,user2Id) =>{
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = "http://localhost:4000/api/conversation";
    
    async function searchMessage(user1Id, user2Id) {
        try {
            setLoading(true); // Indicate that loading has started
    
            const response = await fetch(`${url}?participant1=${user1Id}&participant2=${user2Id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json(); // Parse the JSON response
            console.log("Fetched Messages:", data);
    
            setMessage(data); // Update state with fetched messages
        } catch (err) {
            console.error("Error fetching messages:", err.message);
            setError(err.message); // Update error state
        } finally {
            setLoading(false); // Ensure loading is set to false in all cases
        }
    }
    console.log(message);
    console.log(user1Id,user2Id);
    

   useEffect(()=>{
    if(user1Id && user2Id){
        searchMessage(user1Id,user2Id);
    }
   },[user1Id, user2Id]);

   return {loading , message ,error, setMessage};
    
}
export default useSearch;