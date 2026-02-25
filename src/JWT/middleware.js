const jwt = require("jsonwebtoken");
exports.verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        return res.status(403).json({ error: "Invalid token" });
    }
};

exports.requireAdmin = (req,res,next)=>{
    if(!req.user || req.user.role !== "admin") {
        return res.status(403).json("Access Denied");
    }
    next();
};