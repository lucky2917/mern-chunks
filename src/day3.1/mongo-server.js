require("dotenv").config({ path: "../../.env" });
const Product = require("./product");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const product = require("./product");

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

app.post("/api/products", async (req, res) => {
        try {
          const { name, price } = req.body;
          const newProduct = new Product({ name, price });
          const savedProduct = await newProduct.save();
          res.status(201).json(savedProduct);
        } 
        catch (error) {
          res.status(500).json({ message: error.message });
        }
});

app.get('/api/products/:id', async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch(err){
        console.log(err);
    }
});


app.listen(process.env.PORT);

