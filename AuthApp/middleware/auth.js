// auth,isStudent,isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth =(req,res,next)=>{
try {
    console.log("header",req.header("Authorization"));
    console.log("Body:",req.body.token);
    console.log("cookies:", req.cookies.token);
    const token = req.body.token||req.cookies.token|| req.header("Authorization").replace("Bearer ","");
    
if(!token){
    return res.status(401).json({
        success:false,
        message:"No token provided"
    })
}
try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
     req.user = decode;
     next();
} catch (error) {
    res.status(401).json({
        success:false,
        message:"Invalid token"
    })
}



} catch (error) {
    res.status(401).json({
        success:false,
        message:"Something went wrong while verifying token"
    })
}
}

exports.isStudent = (req,res,next)=>{
try {
    if(req.user.role!="Student"){
        return res.status(401).json({
            success:false,
            message:"This is   not a protected route for student"
        });
    }

    next();
} catch (error) {
    res.status(500).json({
        success:false,
        message:"User role is not matching"
    });
}
}

exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is   not a protected route for Admin"
            });
        }
    
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
    }
