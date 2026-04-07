const jwt = require("jsonwebtoken");
const AUTH_SECRET = "Devesh@0904"


function authmiddleware(req,res,next){
  const token = req.headers.token;
  try{
    const {userId}=jwt.verify(token,AUTH_SECRET);
    req.userId=userId
  }catch(error){
    res.status(400).json({
      message:"Invalid token"
    })
    return;
  }
  next();
}


module.exports = {
  AUTH_SECRET:AUTH_SECRET,
  authmiddleware:authmiddleware
}