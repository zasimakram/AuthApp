const express = require('express');
const router = express.Router();
const {auth,isStudent,isAdmin} = require('../middleware/auth');
router.get('/',(req,res)=>{
    res.send("Welcome to the user page");
})
const {login,signup} = require('../controllers/Auth');

router.post('/signup',signup);
router.post('/login',login);

router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected test route"
    })
})
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for the student",
    })
})
router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for the Admin",
    })
})


module.exports = router;