const jwt = require('jsonwebtoken')
const User = require('../models/User');

module.exports = async(req,res,next)=>{
    const token = req.jeader('Authorization');

    if(!token)
    return res.status(401).json({msg:"Access denied.No token provided"});


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId)
        next();
    }
    catch(ex){
        res.status(400).json({msg:'Invalid token'});
    }
}