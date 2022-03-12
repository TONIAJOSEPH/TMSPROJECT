import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import './User.css';


function User(props) {

  const {id} = useParams();
  const user = props.userData;
      
   
   console.log("single user",user);

   const [accessToken,setAccessToken]=useState(Cookies.get("access"));
   const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));
   Cookies.set("access", accessToken);
   Cookies.set("refresh", refreshToken);

   
   
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
      
      async function singleUser(){
   
        const response = await axiosJWT.get(`http://localhost:6233/api/user/${user.username}`,{
          
        headers: { authorization: "Bearer " + accessToken}
        });
        // const result= await response.json();
        console.log(response.data);  
        
         
       
    }

      useEffect(()=>{
        singleUser()
      },[refreshToken]); 

 //checking for the same name   
async function singleUser(){
   
    const response = await axiosJWT.get(`http://localhost:6233/api/user/${user.username}`,{
      
    headers: { authorization: "Bearer " + accessToken}
    });
    // const result= await response.json();
    console.log(response.data);  
    setInfo(response.data.schedule);
    setUserInfo(response.data.userInfo[0]) 
   
}
const [info,setInfo]= useState([]);
const [userInfo,setUserInfo]=useState([]);

    return (
        <div>
            <div className="ScriptTop">
    <div className="rt-container">
        <div className="col-rt-4" id="float-right">
 
            {/* <!-- Ad Here --> */}
            
        </div>
        <div className="col-rt-2">
            
        </div>
    </div>
</div>

<header className="ScriptHeader">
    <div className="rt-container">
    	<div className="col-rt-12">
        	<div className="rt-heading">
            	<h1>Profile</h1>
                
            </div>
        </div>
    </div>
</header>

<section>
    <div className="rt-container">
          <div className="col-rt-12">
              <div className="Scriptcontent">
              
{/* <!-- Student Profile --> */}
<div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp"/>
            <h3>{`${userInfo.fname} ${userInfo.sname}`}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Register ID : {`${userInfo.registerid}`}</strong>{user.fname}</p>
            <p className="mb-0"><strong className="pr-1">Employee Status: {`${userInfo.emp}`}</strong></p>
            <p className="mb-0"><strong className="pr-1">Email:{`${userInfo.email}`}</strong></p>
          </div>
        </div>
      </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</section>
<Table className="shtab" style={{width: 500}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>Batch</TableCell>
                       <TableCell style={{color:'white'}}>Course</TableCell>
                       <TableCell style={{color:'white'}}>Start Date</TableCell>
                       <TableCell style={{color:'white'}}>End Date</TableCell>
                       <TableCell style={{color:'white'}}>Day</TableCell>
                       <TableCell style={{color:'white'}}>Start Time</TableCell>
                       <TableCell style={{color:'white'}}>End Time</TableCell>
                       <TableCell style={{color:'white'}}>Venue/Link</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {info.map((i,key)=>(
              <TableRow key={key} style={{backgroundColor:'white'}}>
              <TableCell>{i.batch}</TableCell>
              <TableCell>{i.batch}</TableCell>
              <TableCell>{i.startdate.slice(0,10)}</TableCell>
              <TableCell>{i.enddate.slice(0,10)}</TableCell>
              <TableCell>{i.day}</TableCell>
              <TableCell>{i.starttime}</TableCell>
              <TableCell>{i.endtime}</TableCell>
              <TableCell>{i.meeting}</TableCell>
              
              </TableRow>
                  ))}
              </TableBody>
            </Table>


        </div>
    );
}

export default User;