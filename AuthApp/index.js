const express = require('express');
const app = express();

require('dotenv').config();
const PORT =  process.env.PORT || 4000;

var cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./config/database').connect();

app.use(express.json());
const user = require('./routes/user');
app.use('/api/v1',user);

app.get('/',(req,res)=>{
    res.send("Helo ji kaise ho");
});
app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}` );
})