const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                meassage:"User alrready exits",
            })
        }
        
        let hashPassword
        try {
             hashPassword = await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }

        User.create({name,email,password:hashPassword,role});
        return res.status(200).json({
            success:true,
            meassage:"User created successfully"
        });



    }
    catch(error){
        console.error(error);
    return res.status(500).json({
        success:false,
        message:"User can not be registered  please  try again some time later"
    })
    }
}
exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter email and password carefully"
            })
        
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        else{
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            
            user = user.toObject();
            user.token = token;
            user.password=undefined;
        
            const options = {
                expires:new Date(Date.now()+30000),
                httpOnly:true,
            }
            // also read about cookies hizaking and token hizakin
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Login successful"
            })

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:"Login successfully"
            // })
        }



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in login"
        })
    }

}