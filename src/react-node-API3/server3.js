const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [
    {name: "Ravi", age : 20},
    {name: "Ravi123" , age : 21},
    {name: "Ravi Shankar" , age : 22}
]
app.get('/api/users/:username',(req,res)=>{
    const text = req.params.username;
    const found_user = users.find(u=>u.name === text)

    if(found_user){
        res.status(200).json(found_user);
    }
    
    else {
        res.status(404).json({ success: false, message: "User not found in system." });
    }

})
app.listen(3000);