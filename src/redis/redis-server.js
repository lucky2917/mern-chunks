const express = require('express');
const redis = require('redis');
const post = require('./postSchema');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require("dotenv").config({ path: "../../.env" });
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected!");
    })
    .catch((err) =>{
        console.log("Connection Error:", err.message);
    });

    const redisClient = redis.createClient();
    redisClient.on('error', (err) => console.log('Redis Error:', err));
    redisClient.connect().then(() => console.log('Redis Connected'));

app.get('/api/leaderboard', async(req,res) => {
    try{
        const cachedmem = await redisClient.get('global_leaderboard');
        if(cachedmem){
            console.log('Data from redis');
            return res.status(200).json(JSON.parse(cachedmem));
        }
        console.log("Data from mongodb");
        const leaderboard = await post.aggregate([
            {
                $group: { 
                    _id: "$authorName", 
                    totalUpvotes: { $sum: "$upvotes" },
                    postCount: { $sum: 1 }
                },
            },
            { $sort: { totalUpvotes: -1 } },
            { $limit: 5 }
        ]);

        await redisClient.setEx('global_leaderboard', 3600, JSON.stringify(leaderboard));
        res.status(200).json(leaderboard);
    }
    

    catch(err){
        console.log(err);
    }
});

app.post('/api/posts', async (req,res) => {
    
    try{
        const {authorName, title, upvotes} = req.body;
        const newPost = await post.create({ authorName, title, upvotes });
        await redisClient.del('global_leaderboard');
        console.log("Cache Cleared!");
        res.status(201).json(newPost);
    }
    catch(err){
        console.log(err);
    }

})

app.listen(5003);
/*
This server implements a simple leaderboard system using MongoDB and Redis. 
Posts are stored in MongoDB, and the leaderboard is generated using an aggregation 
pipeline that groups posts by author and calculates total upvotes. Since the 
leaderboard is a read-heavy endpoint, Redis is used as a cache layer to avoid 
running the aggregation query on every request. On the first request, data is 
fetched from MongoDB and stored in Redis with a TTL. Subsequent requests are 
served directly from Redis for faster response times. Whenever a new post is 
created, the cache is invalidated to ensure the leaderboard stays consistent. 
Redis runs inside Docker, and environment variables are managed using dotenv.
*/