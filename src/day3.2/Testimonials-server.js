require("dotenv").config({ path: "../../.env" });
const Testimonial = require('./testimonials');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected!");
    })
    .catch((err) =>{
        console.log("Connection Error:", err.message);
    });

app.get('/api/testimonials', async (req,res)=>{
    try{
        const testimonial = await Testimonial.find({});
        res.json(testimonial);
    }
    catch(err){
        console.log(err);
    }
})

app.post('/api/testimonials', async (req,res)=>{
    try{
        const { name, description } = req.body;

        const testimonial = new Testimonial({ name, description });
        const saved = await testimonial.save();
        res.status(201).json(saved);
    }
    catch(err){
        console.log(err);
    }
})
app.delete('/api/testimonials/:id', async (req,res) => {
    try{
        const removed = Testimonial.findByIdAndDelete(req.params.id);
        res.json("done deleted");
    }
    catch(err){
        console.log(err);
    }

})

app.listen(process.env.PORT);