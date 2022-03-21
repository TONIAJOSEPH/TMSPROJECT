import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import './userschedule.css';



const Userschedule = (props) => {

    const user = props.userData;

    //   const {id}=useParams();
       console.log(user.username);

      const [info,setInfo]= useState([]);

      

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

      const  fetchschedules=async ()=>{
        const response = await axiosJWT.get(`http://localhost:6233/api/user/${user.username}`,{
      
            headers: { authorization: "Bearer " + accessToken}
            });
            console.log(response.data);
            setInfo(response.data.schedule);
      }

useEffect(()=>{
     fetchschedules();
},[])
    
    return (
        <div>
            <p className="ush">Schedule Details</p>
            <Table className="shtab" style={{width: 800,marginTop: 350,marginLeft: 200}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>Batch</TableCell>
                       <TableCell style={{color:'white'}}>Course</TableCell>
                       <TableCell style={{color:'white'}}>From</TableCell>
                       <TableCell style={{color:'white'}}>To</TableCell>
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
              <TableCell>{i.courseid}</TableCell>
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
    )
}

export default Userschedule
