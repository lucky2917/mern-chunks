const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./Message');
require("dotenv").config({ path: "../../.env" });
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {cors: {origin: "*"}});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected!");
    })
    .catch((err) =>{
        console.log("Connection Error:", err.message);
    });


app.get('/api/chat/:ticketId' , async(req,res) => {
    try{
        const history = await Message.find({ticketId: req.params.ticketId}).sort({timestamp: 1});
        res.json(history);
    }
    catch(err){
        console.log(err)
    }
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('join_ticket', ticketId => {
        socket.join(ticketId);
        console.log("conected to tiket");
    })

    socket.on('send_support_msg', async (data) => {
        try{
            const savedMsg = await Message.create({
                ticketId: data.ticketId,
                sender: data.sender,
                text: data.text
            });

            io.to(data.ticketId).emit('receive_support_msg', savedMsg);
        }
        catch(err){
            console.log(err);
        }
    })
})

server.listen(5003);



