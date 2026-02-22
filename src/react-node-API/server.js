const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/ping',(req,res)=>{
    res.json({message: "pong"});
})

app.listen(3000);