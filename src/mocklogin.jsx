import { useState } from "react";

export default function mocklogin(){

    const[email,setemail] = useState("");
    const[password, setpassword] = useState("");

    const [result,setresult] = useState("");

    const print = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text1: email,
                    text2: password
                }),
            })
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
                <input type="email" onChange={(e)=>setemail(e.target.value)}/>
                <input type = "password" onChange={(e)=>setpassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>

            {result && (
                <div>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}