const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


let refreshTokens = [];


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


  

  module.exports=verify;