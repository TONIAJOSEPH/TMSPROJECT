import React, { useEffect, useState } from 'react'
import './approved.css'
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { useNavigate } from 'react-router';
import CustomizedDialogs from '../dialogubox/Dialogu';
import Allocation from '../allocation/Allocation';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Approved = (props) => {


    
 const navigate=useNavigate();

 const [active,setActive]=useState([]);
 const [search,setSearch]=useState("");
 
 const [accessToken,setAccessToken]=useState(Cookies.get("access"));
   const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));

   Cookies.set("access", accessToken);
   Cookies.set("refresh", refreshToken);
console.log("access",accessToken);
    const axiosJWT = axios.create()
    const refresh = async () => {
        try {
        const res = await axios.post("/api/refresh",{ token: Cookies.get("refresh") });
        
      
        
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken)
        console.log("access2",Cookies.get("refresh"));
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
     

      
    
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

async function searching(){
    active.map((i)=>{
      const fullname=i.fname+" "+i.sname;
      console.log(fullname);
if(fullname===search){
    console.log("find");
    setActive(active.filter(el=>el.fname+" "+el.sname === search));  
}
else if(i.quali===search) {
    console.log("find");
    setActive(active.filter(el=>el.quali === search));
}
else if(i.emp===search) {
    console.log("find");
    setActive(active.filter(el=>el.emp === search));
}
    })
 
}

useEffect(()=>{
  fetchapproved();
},[search])

//fetching approvedlist
 async function fetchapproved(){
      const response=  await axiosJWT.get("/admin/api/approvedlist",{headers: { authorization: "Bearer " + accessToken }})
        //  const body= await response.json();
        console.log(response.data)
         setActive(response.data);     
 } 
 
 async function handleSignOUt(){
  var res=await axiosJWT.post('/api/logout',{
    headers: {authorization: "Bearer " + accessToken }
  });
  console.log(res);
  Cookies.set("logs",0);
  navigate("/",{replace:true});
   }


    return (
    <div className="approved">
     
        <p className="approve">Approved Trainers </p>
            <FormControl variant="standard">
            <Input className="search" value={search} style={{width: 300,paddingLeft: 10,borderRadius: 20}} id="input-with-icon-adornment" 
            endAdornment={<InputAdornment position="start"><SearchIcon onClick={searching} style={{cursor:'pointer'}}/></InputAdornment>}
            onChange={(event)=>setSearch(event.target.value)}/>
            </FormControl>
            <Table className="approvetable" style={{width: 600}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>name</TableCell>
                       <TableCell style={{color:'white'}}>qualification</TableCell>
                       <TableCell style={{color:'white'}}>employment</TableCell>
                       <TableCell style={{color:'white'}}>skills</TableCell>
                       <TableCell style={{color:'white'}}>Allocation</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {active.map((i,key)=>(
                <TableRow key={key} style={{backgroundColor:'white'}}>
                    <TableCell>{i.fname} {i.sname}</TableCell>
                    <TableCell>{i.quali}</TableCell>
                    <TableCell>{i.emp}</TableCell>
                    <TableCell>{i.skill+" "}</TableCell>
                    <TableCell><CustomizedDialogs><Allocation item={i}/></CustomizedDialogs></TableCell>
                </TableRow>
                  ))}
              </TableBody>
            </Table>
        </div>
    )
}

export default Approved
