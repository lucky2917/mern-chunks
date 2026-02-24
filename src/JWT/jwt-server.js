const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require("dotenv").config({ path: "../../.env" });
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
app.use(express.json());
const { verifyToken } = require("./middleware");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const rateLimit = require("express-rate-limit");

const User = require("./User");

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected!");
    })
    .catch((err) =>{
        console.log("Connection Error:", err.message);
    });


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: { error: "Too many login attempts. Try again later." }
})
app.post('/api/auth/register', async (req,res)=>{
    const user = await User.create(req.body);
    res.json(user);
});

app.get('/api/protected', verifyToken, (req,res) => {
    res.json({
        message: "You are authenticated!",
        user: req.user
      });
});

app.post('/api/auth/login', loginLimiter, async(req,res) => {
    console.log("BODY:", req.body);
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password,user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
    res.cookie("token", token,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({
        success: true,
        user: {
            name: user.name,
            email: user.email
        }
    });


})

app.post('/api/auth/logout', (req,res) => {
    res.clearCookie("token");
    res.json("Logout successfull");
})
app.listen(3003);