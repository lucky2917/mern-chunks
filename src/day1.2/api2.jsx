import { useState } from "react";

export default function api2(){
    const [result, setresult] = useState("");
    const [input, setinput] = useState("");
    
    const print = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/transform', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({text: input}),
            })

            if(!response.ok) throw new Error("Server error");

            const data = await response.json();
            setresult(data);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <form onSubmit={print}>
                <input type="text" onChange={(e)=>setinput(e.target.value)}></input>
                <button type="submit" >Submit</button>
            </form>
            {result && (
                <div>
                    <p>Uppercase: {result.transformed}</p>
                    <p>Reversed: {result.reversed}</p>
                    <p>Length: {result.length}</p>
                </div>
            )}
        </div>
        
        
    );
}