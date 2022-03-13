import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../Home/navbar/Navbar';
import {Link, AppBar, Toolbar, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {UserContext} from '../../App.js'

function Login(props) {

    const {state,dispatch} = useContext(UserContext);
    var [loginValues,setloginValues] = useState([]);

    

    // Storing Form Field Values
    var [formValues, setFormValues] = useState({ username: "",password: "" });
    
    // Manage Form Error Values
    const navigate = useNavigate();
    
    // Flag for Form Submission Status
    var [isSubmit, setIsSubmit] = useState(false); 
    
    
     
    
    
    
    
    
    
    // Manage Field Change
      const  handleChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target; //destructuring
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }
    
    console.log(formValues);
    const id = loginValues.id;
       
        var username =  loginValues.username;
    useEffect(()=>{
        redirected();
    
    },[loginValues])
    // Manage Form Refresh
     const handleSubmit =  async (event) => {
        event.preventDefault();
        
      await  axios.post('/api/login',formValues).then((response)=>{
    
            setloginValues(response.data);
            console.log("data",response.data);
            setIsSubmit(true)
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            Cookies.set("access", accessToken);
            Cookies.set("refresh", refreshToken);
            console.log( Cookies.get("refresh"));
            
    });
         
           
            setFormValues({ username: "",password: "" });
        
      
           
    }
    
    // function  fetch(){
        
    //   }
    
    console.log("login",loginValues.accessToken);
    
    console.log("use",loginValues.username);


    var [Sign,setSign]=useState("");
    
     function redirected(){  
        
    //    console.log(formValues.username);
    //    console.log(username);
    console.log("full",loginValues.id);
       if( loginValues.id=="621c90a152ec1005d7ca5645") {

        dispatch({type:"ADMIN", payload:"isAdmin"});
        // props.setLogInfo(Cookies.get("log")) ;
          
          navigate(`/admin/home`,{replace:true});
          console.log("Admin Login");
          setIsSubmit(false)
       }
     else  if(isSubmit &&  formValues.username!='admin' && formValues.username===username) {
           
            setSign("Please go to User Login")
            setIsSubmit(false)
           
        }

        else  if((isSubmit==true) &&  (username=='')) {
           
            setSign("Invalid Login credentials")
            setIsSubmit(false)
           
        }

       
    
       
      
    }
    
    
    
    
  
        
        return (
            <div>
               
                {/* { (isSubmit &&  isAuth) ?(<Header Values={loginValues}/>):<pre className='pretext'>Invalid Login Credentials</pre>} */}
                
                <div className="log">
                    <Link href='/admin/login' className="adlog" >Admin Login</Link> 
                    <Link href='/user/login' className="uslog">User Login</Link>
                    <form onSubmit={handleSubmit}>
                    <label for="chk" aria-hidden="true">Sign In</label>
                            <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                            
                            
                            <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                            { isSubmit &&  loginValues.status==="Authentication failed" ?(<h3>Invalide credentials</h3>):(<h3></h3>)}
                            <button>Sign In</button>
                            <br></br>
                            <h3>{Sign}</h3>
                    </form>
                </div>
                
            </div>
           
        );
    }

export default Login;