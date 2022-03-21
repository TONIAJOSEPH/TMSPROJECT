require("dotenv").config();
const express=require("express");
const AdminRoutes=express.Router();
const Register = require('../model/registerModel');
const Allocation = require('../model/allocationModel');
const nodemailer=require("nodemailer");
const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');




// const Auth=require("../authentication/jwtauth");
// AdminRoutes.use(verify,require("../authentication/jwtauth"));

let refreshTokens = [];

const verify =  (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
     
      const token = authHeader.split(" ")[1];
      
     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        console.log("verified");
        console.log(token);
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };







AdminRoutes.get("/api/userdetails",verify,async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
         await Register.find({approval:false}).then(
             (user)=>{
                  res.json(user);
             }
         ) 
    } catch (err) {
        res.json("error");
    }
})




AdminRoutes.post("/api/user/delete/:id",verify, async (req,res)=>{
    const id=req.params.id;
        console.log(id);
   
      try {
        
        Register.findOneAndDelete({_id:id}).then((person)=>{
         res.json(person);
         console.log("person");
         })
  
    } catch (error) {
        res.json("error");
    }
  });



  AdminRoutes.post("/api/updatestatus/:id",verify,async (req,res)=>{
    const emp=req.body.body;
    console.log(req.body) ; 
    console.log(emp) ; 
   const id=req.params.id;
   const filter = {_id:id};
   const update = {$set:{approval:true,emp:emp}};
  await Register.findOneAndUpdate(filter,update,{new:true}).then((user)=>{
       res.json(user);
   })
    
  });
  
//getting eachuser for sending email
AdminRoutes.get("/api/select/:id",verify,async (req,res)=>{
    try {
        const id=req.params.id;
       await Register.find({_id:id}).then(
           (values)=>{
res.json(values);
           }
       )
    } catch (error) {
        console.log(error)
    } 
})

AdminRoutes.post("/api/mailer",(req,res)=>{
    console.log(req.body.body);
    var data1=req.body.body.email;
    var data2=req.body.body.uname;
    var data3=req.body.body.pass;
    var data4=req.body.body.employ;
    var transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"ictaktms@gmail.com",
            pass:"ictak123*"
        }
    
    });
     
    var mailoptions={
        from:"ictaktms@gmail.com",
        to: data1,
        subject:"confirmation of approval",  
        html: "<h3>You are approved as ICTAK trainer.Please login with username and password....</h3><br/><table border='1' width='70%' height='100px' style='border-collapse:collapse;'>\
                     <tr style='background-color: black;'>\
                        <th style='color: white;'>Username</th>\
                        <th style='color: white;'>Employ type</th>\
                    </tr>\
                 <tr>\
                 <td style='text-align: center'>"+data2+"</td>\
                 <td style='text-align: center'>"+data4+"</td>\
                   </tr>\
                  </table><br/>"      
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else{
            console.log("email send successfully");
        }
    }); 
});



AdminRoutes.get("/api/approvedlist",verify,async (req,res)=>{
    try {
        await Register.find({approval:true,username:{$ne:'admin'} }).then(
            (active)=>{
                  res.json(active);
            }
        )
    } catch (error) {
        console.log(error);
    }
   
  })

// checking for the same name
AdminRoutes.post("/api/allocation/:newname",verify,async (req,res)=>{
    const newname=req.params.newname;
    const items = req.body.body;
    
  const startSplit = items.time.split(':');
  const startTime = parseInt(startSplit[0]+startSplit[1]);
  const endSplit = items.eTime.split(':');
  const endTime = parseInt(endSplit[0]+endSplit[1]);
    
    const user = req.body.body.item;
    console.log(user);
  const result= await Allocation.find({$and:[{username:items.item.username},
  {registerid:items.item.registerid},{day:items.day},
  
  {$or:[{$and:[{starttime:{$lte:startTime}},{endtime:{$gte:startTime}}]},
  {$and:[{starttime:{$lte:endTime}},{endtime:{$gte:endTime}}]}]},
  
  {$or:[{$and:[{startdate:{$lte:items.startdate}},{enddate:{$gte:items.startdate}}]},
  {$and:[{startdate:{$lte:items.enddate}},{enddate:{$gte:items.startdate}}]}]}
  
  ]});
   console.log(result);
  if(result.length==0){
     const saveData = new Allocation({
       username:user.username,registerid:user.registerid,
       fname:user.fname,sname:user.sname,
       batch: req.body.body.batch,courseid:req.body.body.courseid,
       time:req.body.body.time,startdate:req.body.body.startdate,
       day:req.body.body.day,enddate:req.body.body.enddate,
       meeting:req.body.body.meeting,schedule:req.body.body.schedule,
       starttime:startTime,endtime:endTime,image:user.image
  
      })
      const savedData = await saveData.save();
      console.log(result);
      res.send(savedData);
     }
  
   
      else {
  
        
         console.log(result)
         console.log(items.startdate)
         res.send("Already this Date and Time are taken");
      }
  })


  //getting all schedules of trainers
AdminRoutes.get("/api/allocated",async (req,res)=>{
    try {
       await Allocation.find().then((trainer)=>{
         res.json(trainer);
         console.log(trainer);
        })
    } catch (error) {
        console.log(error);
    }    
    })


module.exports=AdminRoutes;