require("dotenv").config();
const express=require("express");
const UserRoutes=express.Router();
const Register = require('../model/registerModel');
const Allocation = require('../model/allocationModel');
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');

let refreshTokens = [];


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



  UserRoutes.post("/api/refresh", (req, res) => {
    console.log("in refresh api");
      //take the refresh token from the user
      const refreshToken = req.body.token;
   
      //send error if there is no token or it's invalid
      if (!refreshToken) return res.status(401).json("You are not authenticated!");
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
      }
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



UserRoutes.get("/:id",verify, async (req,res)=>{

  
    const username= req.params.id;
    
    
    console.log(username);
    try {
      const schedule =  await Allocation.find({username:username});
      const userInfo = await Register.find({username:username});
      
      res.send({schedule,userInfo});
      console.log(userInfo);
      console.log(schedule);
     } catch (error) {
         console.log(error);
     }      
  })
  

  module.exports=UserRoutes;