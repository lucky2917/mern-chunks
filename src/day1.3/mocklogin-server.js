const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const user = {
    email: "your.ravi@icloud.com",
    password: "qwerty"
}
app.post('/login', (req,res)=>{
    const receivedText1 = req.body.text1;
    const receivedText2 = req.body.text2;

    if(receivedText1 == user.email && receivedText2 == user.password){
        res.json("Successful")
    }
    else{
        res.json("Failed")
    }
})
app.listen(3000);