import React, { useContext,useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {UserContext} from '../App.js'

function Logout(props) {

    const [accessToken,setAccessToken]=useState(Cookies.get("access"));
    const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));
    Cookies.set("access", accessToken);
    Cookies.set("refresh", refreshToken);

    const {state,dispatch} = useContext(UserContext);
    const navigate=useNavigate();
    
 
    
    
   console.log("access",accessToken);
 
     const refresh = async () => {
         try {
         const res = await axios.post("http://localhost:6233/api/refresh",{ token: Cookies.get("refresh")});
         
       
         
         setAccessToken(res.data.accessToken);
         setRefreshToken(res.data.refreshToken)
         console.log("access2",Cookies.get("refresh"));
           return res.data;
         } catch (err) {
           console.log(err);
         }
       };
      
 
       const axiosJWT = axios.create()
     
       axiosJWT.interceptors.request.use(
         async (config) => {
           let currentDate = new Date();
          
           const decodedToken = jwt_decode(accessToken);
           
           if (decodedToken.exp * 1000 < currentDate.getTime()) {
             const data = await refresh();
             console.log("refrsh",data.refreshToken)
             
             config.headers["authorization"] = "Bearer " + data.accessToken;
           }
           return config;
         },
         (error) => {
           return Promise.reject(error);
         }
       );
 
       useEffect(()=>{
         allocated();
       },[]);
 
  //checking for the same name   
 async function allocated(){
    
  const response = await axiosJWT.post(`http://localhost:6233/api/logout`,
     {
     headers: { authorization: "Bearer " + Cookies.get("access") },
     
   
   });
     // const result= await response.json(); 
     
     console.log(response.status);
     dispatch({type:"LOGOUT", payload:"isLogout"});  
     navigate("/",{replace:true})
 }

    return (
        <div>
            
        </div>
    );
}

export default Logout;