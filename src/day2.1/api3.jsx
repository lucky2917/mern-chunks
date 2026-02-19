import { useState } from "react";

export default function api3(){
    const [username, setusername] = useState("");
    const [data, setdata] = useState(null);
    const print = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/api/users/${username}`)
            if (!response.ok) {
                setdata(null);
                return;
            }
            const result = await response.json();
            setdata(result);
        }
        
        catch(err){
            console.log(err);
        }
    } 
    return(
        <div>
            <form onSubmit={print}>
                <input type="text" onChange={(e) => setusername(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            {data && 
                <div>
                    <h3>{data.name}</h3>
                    <p>{data.age}</p>
                </div>      
            }
        </div>
    );
}