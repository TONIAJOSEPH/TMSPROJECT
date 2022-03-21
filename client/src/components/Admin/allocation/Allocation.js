import React, { useEffect, useState } from 'react'
import './allocation.css'
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


const Allocation = (props) => {



    // const {id} = props;
    const {item} = props;

     console.log(item);

    const navigate=useNavigate();
   
    const [trainer,setTrainer]=useState([]);
    const [batch,setBatch]=useState("");
    const [courseid,setCourseid]=useState("");
    const [day,setDay]=useState("");
    const [time,setTime]=useState("");
    const [eTime,setETime]=useState("");
    const [startdate,setStartdate]=useState("");
    const [enddate,setEnddate]=useState("");
    const [meeting,setMeeting]=useState("");
    const [schedule,setSchedule]=useState("");
    const [activetrainers,setActivetrainers]=useState([]);
  
  const [accessToken,setAccessToken]=useState(Cookies.get("access"));
   const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));

   Cookies.set("access", accessToken);
   Cookies.set("refresh", refreshToken);
  console.log("access",accessToken);

    const refresh = async () => {
        try {
        const res = await axios.post("/api/refresh",{ token: Cookies.get("refresh")});
        
      
        
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

 //checking for the same name   
async function allocated(){
   if (batch && courseid && day && eTime && time && startdate && enddate && meeting && schedule ) {
    const newname=item.username;
    console.log(newname);
    const response = await axiosJWT.post(`/admin/api/allocation/${newname}`,
    {body:{item,batch,courseid,day,time,eTime,startdate,enddate,meeting,schedule},
    headers: { authorization: "Bearer " + Cookies.get("access") }});
    // const result= await response.json();
    console.log(response);
    setActivetrainers(response);

  if(response.data.username==item.username && response.data.registerid==item.registerid){
        console.log("length is greater");
        navigate("/admin/scheduledlist");
    }
   } else {
       alert("enter all details");
   }
   
}




    return (
        <div className="allo">
           <div className="allocateform">
            <form>
                <div>
                <TextField placeholder="Id" variant="filled" style = {{width: 150}} size="small" value={item.registerid} InputProps={{ readOnly: true,}}/>
                <span className="text2">  <TextField placeholder="name" variant="filled" size="small" style = {{width: 200}} value={item.fname}  InputProps={{ readOnly: true,}}/></span> 
                <span className="text2"><TextField placeholder="qualification" variant="filled" size="small" style = {{width: 175}} value={item.quali} InputProps={{ readOnly: true,}}/></span><br/><br/>
                <TextField placeholder="skills" variant="filled" size="small" style = {{width: 170}}  value={item.skill} InputProps={{ readOnly: true,}}/>
                <span className="text2"><Select value={batch} displayEmpty onChange={(e)=>setBatch(e.target.value)} size="small" style = {{width: 180}} variant="filled">
                <MenuItem value="" disabled>select batch</MenuItem>
                <MenuItem value="batch1">batch1</MenuItem>
                <MenuItem value="batch2">batch2</MenuItem>
                <MenuItem value="batch3">batch3</MenuItem>
                <MenuItem value="batch4">batch4</MenuItem>
                </Select></span>
                <span className="text2">
                <Select  value={courseid} displayEmpty onChange={(e)=>setCourseid(e.target.value)} size="small" style = {{width: 180}} variant="filled">
                <MenuItem value="" disabled>course id</MenuItem>
                <MenuItem value="FSD">FSD</MenuItem>
                <MenuItem value="RPA">RPA</MenuItem>
                <MenuItem value="DSA">DSA</MenuItem>
                <MenuItem value="CSA">CSA</MenuItem>  
                </Select>
                </span><br/><br/>
                <TextField className="text2" type="time" size="small" label="Start time" style = {{width: 150}} name="starttime" focused value={time} onChange={(e)=>setTime(e.target.value)} variant="filled"/>
                <span className="text2"><TextField type="time"  size="small" label="End time" style = {{width: 150}} name="endtime" focused value={eTime} onChange={(e)=>setETime(e.target.value)} variant="filled"/></span>
             
                <span className="text2">
                <Select variant="filled" value={day} displayEmpty onChange={(e)=>setDay(e.target.value)} size="small" style = {{width: 230}}>
                <MenuItem value="" disabled>day</MenuItem>
                <MenuItem value="sunday">sundays</MenuItem>
                <MenuItem value="monday">mondays</MenuItem>
                <MenuItem value="tuesday">tuesdays</MenuItem>
                <MenuItem value="wednesday">wednesdays</MenuItem>
                <MenuItem value="thursday">thursdays</MenuItem>
                <MenuItem value="friday">fridays</MenuItem>
                <MenuItem value="saturday">saturdays</MenuItem> 
                </Select>
                </span>
                 <br/><br/>
                <TextField variant="filled" type="date" size="small" label="start date" focused style = {{width: 270}} value={startdate} onChange={(e)=>setStartdate(e.target.value)}/>
                <span className="text2"><TextField variant="filled" type="date" size="small" label="end date" focused style = {{width: 270}} value={enddate} onChange={(e)=>setEnddate(e.target.value)}/></span><br/><br/>
                <TextField variant="filled" size="small" label="meeting link"  style = {{width: 550}} value={meeting} onChange={(e)=>setMeeting(e.target.value)} /><br/><br/>
                <TextField variant="filled" size="small" label="schedule"  style = {{width: 550}} value={schedule} onChange={(e)=>setSchedule(e.target.value)}/><br/><br/>
               <Button variant="contained" color="success" onClick={allocated} style = {{float: 'right'}}>schedule</Button>
               
              </div>
            </form>
           </div>
         </div>
    )
}
export default Allocation
