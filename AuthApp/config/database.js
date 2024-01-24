const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

// const db = ()=>{
//     try {
//         mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
//         console.log("DB connection succesfully");
//     } catch (error) {
//         console.log("DB connection issues");
//         console.log(error);
//     }
// }
// module.exports=db;
exports.connect=()=>{

    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("DB connected succesfully");
    }).catch((err)=>{
        console.log("Db connection issues");
        console.error(err);
        process.exit(1);
    });
}