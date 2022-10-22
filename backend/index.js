const express=require('express');
const bodyParser = require('body-parser');
const dbConfig=require('./config/dbConfig'); //./ znaci kreni mi od roota? 
const mongoose= require('mongoose');
const Users=require('./models/userModel');
// console.log(Users);
// console.log(dbConfig);


const app=express();
// const router=express.Router();
mongoose.connect(dbConfig.MONGODB_URL)
.then(data=>console.log("MONGO DB is connected"))
.catch(err=>console.log(`Error while connecting to MONGO DB: ${err}`));
// router.use('')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/login',(req,res)=>{
    // console.log(req.body);
    const reqBody=req.body;
    console.log("----------");
    console.log(reqBody);
    console.log("-------");

    const foundUser=Users.findOne(reqBody,(err,data)=>{
        console.log(data);
        if(err){
            const errorMsg=`Error on getting user from DB:${err}`;
            console.log(`${errorMsg}`);
            res.send(`${errorMsg}`);
        }else{
            res.send(data);
        }
    });
    
})

app.listen(4000,err=>{
    if(err){
        console.log(err);
    }else{
    console.log("Server is running on port: 4000");
    console.log("test");
    }
})


//kucaj npm i i radi ti projekat