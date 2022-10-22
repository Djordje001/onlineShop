const express=require('express'); //postavljanje node backend servera?
const bodyParser = require('body-parser'); //parsiranje podataka koji dolaze sa frontenda
const mongoose= require('mongoose'); //za mongodb

//nasi fajlovi su ova dva ispod,a ovo gore je instalirao
const dbConfig=require('./config/dbConfig'); //./ znaci kreni mi od roota? 
const Users=require('./models/userModel');
const serverConfig=require('./config/serverConfig');
// console.log(serverConfig);
// console.log(Users);
// console.log(dbConfig);


const app=express();
// const router=express.Router();
mongoose.connect(dbConfig.MONGODB_URL) //konekcija sa bazom
.then(data=>console.log("MONGO DB is connected"))
.catch(err=>console.log(`Error while connecting to MONGO DB: ${err}`));
// router.use('')
app.use(bodyParser.urlencoded({ extended: false }));  //podesavanja
app.use(bodyParser.json());             //podesavanja
app.post('/api/login',(req,res)=>{ //ova funkcija se izvrsava kad se opali api poziv
    // console.log(req.body);
    //req stize sa frontenda i to je ono body u postmanu,a res je ono sto mi hendelujemo na backendu i saljemo?
    const reqBody=req.body;
    // console.log("----------");
    // console.log(reqBody);
    // console.log("-------");

    const foundUser=Users.findOne(reqBody,(err,data)=>{ //reqBody mi trazimo,err uklk nastane greska,a data u koliko se nadje nesto
        // console.log('logovan user...',data);
        // res.send(err);
        if(err){
            const errorMsg=`Error on getting user from DB:${err}`;
            console.log(errorMsg);
            res.send(errorMsg); //vrati frontendu gresku
            return;
        }


        /*if(data){ //prvi nacin if else
            console.log("ulogovan");
            res.send(data); //ulogovao se korisnik(vraca frontendu)
        }
        else{
            console.log("ne postoji");
            res.send("User not found"); //user nije pronadjen i to se vraca frontendu
        }*/
        // res.send(data ? data : "User not found."); //drugi nacin
        res.send(data || 'User not found.'); //treci nacin
    });
    
});

app.post('/api/register',async (req,res)=>{ //post je upisivanje u bazi a put abdejtovanje u bazi! ! !! ! ! ! !,get uzimanje,delete brisanje
    const reqBody=req.body;
    // console.log(reqBody);
    const foundUser=Users.findOne(reqBody,async(err,data)=>{ //reqBody mi trazimo,err uklk nastane greska,a data u koliko se nadje nesto
        // console.log('logovan user...',data);
        // res.send(err);
        if(err){
            const errorMsg=`Error on register user:${err}`;
            console.log(errorMsg);
            res.send(errorMsg); //vrati frontendu gresku
            return;
        }
        if(data){
            res.send(`user already exist:${data.username}`);
        }
        else{
            const newUser=new Users(reqBody);
            const saveNewUser=await newUser.save();
            console.log(newUser);
            res.send(saveNewUser || "User not registered.");
        }
    });
})

app.listen(serverConfig.port,err=>{ //napravli smo server koji se vrti,rekli smo ekspresu slusaj port 4000 i pokreni mi server
    if(err){
        console.log(err);
    }else{
    console.log(serverConfig.serverRunningMsg);
    // console.log("test");
    }
})


//kucaj npm i i radi ti projekat