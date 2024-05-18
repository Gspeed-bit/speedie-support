

const jwt = require("jsonwebtoken");
const asyncHandler= require("express-async-handler")
const User = require("../models/userModel")

// used to protect route
const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
          //turn it into an array
          token = req.headers.authorization.split(' ')[1];
// decoded token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          //get user from token
          req.user = await User.findById(decoded.id).select('-password');// it will exclude the password because we dont need it
          next();
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}