import React, { useState, useEffect } from 'react'
import './userlist.css'
import { Button ,Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { useNavigate } from 'react-router';
import BasicModal from '../card/Usercardview';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Userlist = (props) => {

   const [accessToken,setAccessToken]=useState(Cookies.get("access"));
   const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));

   Cookies.set("access", accessToken);
   Cookies.set("refresh", refreshToken);
console.log("access",accessToken);
    const refresh = async () => {
        try {
        const res = await axios.post("/api/refresh",{ token: Cookies.get("refresh") });
        
        Cookies.set("access", res.data.accessToken);
        Cookies.set("refresh", res.data.refreshToken);
        
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

   const navigate=useNavigate();
   
    const [employ,setEmploy]=useState("");
    const [user,setUser]=useState([]);
    const [isSubmit,setIsSubmit]=useState(false);
    
    const [approvedTrainer,setapprovedTrainer]=useState("");

   console.log(JSON.stringify(employ));
//getting registered details for approving in front end
async function fetchuserlist(){
         const response=await axiosJWT.get("/admin/api/userdetails", {headers: { authorization: "Bearer " + accessToken }});
        //  const body=await response.JSON();
         console.log("map",response.data);
         setUser(response.data);   
}

useEffect(()=>{
  fetchuserlist();
},[isSubmit])


//rejecting
 async function fetchdelete(e){ 
    const id=e.target.id;
    const token= Cookies.get("access")
    console.log("deleted",accessToken);
    setIsSubmit(true)
    console.log("new token",token);
    let res= await axiosJWT.post(`/admin/api/user/delete/${id}`,
    {headers:{authorization: "Bearer "+ accessToken}})
    if(isSubmit){
    console.log("deleted",res);
    setUser(user.filter(i=>i.id !== id));
    setIsSubmit(false);
    }
   
    
    

    
    // try {
      
    // } catch (error) {
    //     console.log("error"); 
    // }  
      
}



//updating status as approved
async function fetchstatus(event){
    const id=event.target.id;
    if(employ){
       const updated= await axiosJWT.post(`/admin/api/updatestatus/${id}`,{
           
           body:employ,
           
           headers: {
            
             authorization: "Bearer " + accessToken 
        } 
        
       })
      // const up=await updated.json();
      fetchapprove(event);
    }
    else{
     alert("select employ type");
    }
}

//getting each user for sending mail
 async function fetchapprove(event){
     try { 
        const id=event.target.id;
        const result = await axiosJWT.get(`/admin/api/select/${id}`, {headers: { authorization: "Bearer " + accessToken }})
        // const values =  await result.json();
        console.log(result);
        setapprovedTrainer(result);
        const item={
            username:result.data[0].username,
            email:result.data[0].email,
            password:result.data[0].password
            }
                 fetchemail(item);
                
                 navigate("/admin/approvedlist",{replace:true});    
                 
     } catch (error) {
         console.log(error);
     }
 } 

 //sending confirmation email 
  async function fetchemail(item){
  const email=item.email;
  const uname=item.username;
  const pass=item.password;
  await axiosJWT.post(`/admin/api/mailer`,{
     
       body:{uname,email,pass,employ},
      headers: {
          
          authorization: "Bearer " + accessToken 
      }
  })
 
 }

 async function handleSignOUt(){
  var res=await axiosJWT.post('/api/logout',{
  headers: {authorization: "Bearer " + accessToken }
});

console.log(res);
Cookies.set("log",0);
navigate("/",{replace:true});
 }

 useEffect(()=>{
  Cookies.set("log",1);
},[])

    return (
        <div className="usedetail">
       
            <p className="user">Pending Requests</p>
        <Table className="tabl"style={{backgroundColor:'black',width: 500}}>
            <TableHead>
                <TableRow>
                    <TableCell style={{color:'white'}}>Name</TableCell>
                    <TableCell style={{color:'white'}}>Qualification</TableCell>
                    <TableCell style={{color:'white'}}>Skills</TableCell>
                    <TableCell style={{color:'white'}}>Company</TableCell>
                    <TableCell style={{color:'white'}}>Designation</TableCell>
                    <TableCell style={{color:'white'}}>Employment</TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                    {/* <TableCell style={{color:'white'}}></TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                    {user.map((i,key)=>(
                <TableRow key={key} style={{backgroundColor:'white'}}>
                    <TableCell>{i.fname+" "+i.sname}</TableCell>
                    <TableCell>{i.quali}</TableCell>
                    <TableCell>{i.skill+" "}</TableCell>
                    <TableCell>{i.org}</TableCell>
                    <TableCell>{i.job}</TableCell>
                    <TableCell>
                    <select className="optemploy" onChange={(e)=> setEmploy(e.target.value)}>
                    <option value="">select</option>
                    <option value="internal">internal</option>
                    <option value="empanel">empanel</option>
                    <option value="expert">industry expert</option>
                    </select>
                    </TableCell>
                    <TableCell style={{color:'white'}}><Button variant="contained" color="success" id={i._id} onClick={fetchstatus}>approve</Button></TableCell>
                    <TableCell style={{color:'white'}}><Button variant="contained" color="error" id={i._id} onClick={fetchdelete}>Reject</Button></TableCell>
                    <TableCell style={{color:'white'}}><BasicModal item={i}></BasicModal></TableCell>
                    {/* <TableCell style={{color:'white'}}><Button variant="contained" color="error" id={i._id} onClick={fetchuser}>username</Button></TableCell> */}
                </TableRow>
))}
            </TableBody>
        </Table>
        </div>
    )
}
export default Userlist;
