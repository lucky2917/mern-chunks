import { useState,useEffect } from "react";

export default function Testimonials(){
    const[name,setname] = useState("");
    const[description,setdescription] = useState("");
    const [testimonials, setTestimonials] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5003/api/testimonials")
          .then(res => res.json())
          .then(data => setTestimonials(data));
    }, []);
    const print = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5003/api/testimonials' , {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        })
        const newdata = await response.json();
        setTestimonials([...testimonials,newdata]);

        setname("");
        setdescription("");
    }
    return(
        <div>
            <form onSubmit={print}>
                <input type="name" placeholder="enter name" onChange={(e) => setname(e.target.value)}/>
                <textarea placeholder="enter description" onChange={(e)=>setdescription(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        {testimonials.map((t) => (
            <div key={t._id}>
              <h4>{t.name}</h4>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
    );
}