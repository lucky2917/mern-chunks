import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5003");

export default function Chatserver(){
    const ticketId = "ticket_123";
    const[username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("join_ticket", ticketId);
      
        fetch(`http://localhost:5003/api/chat/${ticketId}`)
          .then(res => res.json())
          .then(data => {
            console.log("Fetched history:", data);
            setMessages(data);
          });
      
      }, []);
      useEffect(() => {
    
        const handleMessage = (newMsg) => {
          setMessages(prev => [...prev, newMsg]);
        };
    
        socket.on("receive_support_msg", handleMessage);
    
        return () => {
          socket.off("receive_support_msg", handleMessage);
        };
      }, []);

      const sendMessage = () => {
        if (!message || !username) return;
    
        socket.emit("send_support_msg", {ticketId,sender: username,text: message,});
    
        setMessage("");
      };

    return(
        <div>
            <h2>Ticket: {ticketId}</h2>
            <input type= "text" placeholder='your name' onChange={(e) => setUsername(e.target.value)}/>

            <div style={{ border: "1px solid black", height: 200, overflow: "auto" }}>
                {messages.map((m, i) => (
                <div key={i}>
                    <b>{m.sender}:</b> {m.text}
                </div>
            ))}
            </div>

            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}