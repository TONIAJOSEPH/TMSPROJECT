require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Register = require('./model/registerModel');
// const Allocation = require('./model/allocationModel');
const bcrypt = require('bcrypt');
const path = require('path');
// const nodemailer=require("nodemailer");
const multer=require("multer");

const app = express();

const port = process.env.PORT || 6233;
let refreshTokens = [];





const AdminRouter=require("./routes/adminRoutes");
const UserRouter=require("./routes/userRoutes");


app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.use("/admin",AdminRouter);
app.use("/api/user",UserRouter);

mongoose.connect(process.env.MONGO_DB);

//image uploading
const storage=multer.diskStorage({
  destination: (req,file,callback)=>{
   callback(null,"./client/public/uploads/");
  },
  filename: (req,file,cb )=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})
const upload=multer({
  storage:storage
})



// API for refresh token verification and new refrsh and access token generation
app.post("/api/refresh", (req, res) => {
  console.log("in refresh api");
    //take the refresh token from the user
    const refreshToken = req.body.token;
 
    //send error if there is no token or it's invalid
    // if (!refreshToken) return res.status(401).json("You are not authenticated!");
    // if (!refreshTokens.includes(refreshToken)) {
    //   return res.status(403).json("Refresh token is not valid!");
    // }
    //if everything is ok, create new access token, refresh token and send to user
    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  });
  
  // Access token generating function
  const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username },process.env.SECRET_KEY, {
      expiresIn: "7s",
    });
  };
  
  // Refresh token generating function
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_KEY);
  };


// User Registration or Enrollment API
  app.post('/api/register',upload.single("myfile"),async(req,res)=>{

    try {
      var data = req.body;
      var info = req.body.course;
    
    // Checking username or email exists in DB
    var details = await Register.find({username:data.username});
    var email = await Register.find({email:data.email});
   
    if ((email.length==0) && (details.length==0)&&(data.password!==""
    && data.username!=="" && data.email!=="")) {

      // For RegisterID -Random number creation between 1 and 1000
      var digits=Math.floor((Math.random() * 1000) + 1);
      
      // Skill into array
      var skillset= data.skill.split(",");

     
      // RegisterID Creation - with 4 digits random number with zero as prefix
      var userid=data.fname.charAt(0)+"ICTAK"+data.sname.charAt(0)
      +digits.toString().padStart(4,'0'); 

      console.log(userid);
      
      // Adding user data to the collection Register with password hashing
        var user = new Register({email:data.email,password: bcrypt.hashSync
        (data.password,10),fname:data.fname,sname:data.sname,
        username:data.username,registerid:userid,quali:data.quali,
        job:data.job,org:data.org,skill:skillset,course:info,approval:req.body.approval,emp:"",image:req.file.filename});

        console.log(user);
        var result = await user.save();
        
        res.json({status:"Success"});
        
    } 
   
    else {
        res.send("Username or Email already exists");
    }
  
      
    }
    catch (error) {

      res.json({status:"Error"});
      
  }
});


      
      // Login API

app.post("/api/login",async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username!="" &&  password !=""){
    const user =await Register.findOne({username: username});
    console.log(user);
  if(user!=null){ 
    const passwordChecker = await bcrypt.compare(password,user.password);
    console.log(passwordChecker);
    if ( user.approval==true && passwordChecker) {
      
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
    
     
      refreshTokens.push(refreshToken);
      res.json({
        username: user.username,
        id:user.id,
        accessToken,
        refreshToken,
      });
    } 
      else if( user.approval==false && passwordChecker) {
      res.json("Approval Pending!");
    }
      else{
        res.json("Invalid Credentials!");
      }
    
      }
      else{
        res.json("Invalid Credentials")
      }
    }

  else{
    res.json("type password or username");
  }
  
  });


  // Verifying Access token for protected APIs
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


// Logout API and removing refresh token from the array refreshTokens
  app.post("/api/logout", verify, (req, res) => {
    console.log("logout");
    const refreshToken = req.body.token;
    console.log(refreshToken);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });
  
  


  app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
})

app.listen(port, () => {
    console.log("Listening on port "+port);
});
