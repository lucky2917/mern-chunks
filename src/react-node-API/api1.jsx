import { useState } from "react";
export default function api1(){
    const[message, setmessage] = useState("");
    const print = async()=>{
        setmessage("");
        try{
            const response = await fetch('http://localhost:3000/ping');
            const data = await response.json();
            setmessage(data.message);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <button onClick={print}>ping</button>
            {message && <h2>Server says: {message}</h2>}
        </div>
        

    );
}