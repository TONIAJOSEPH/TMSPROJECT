import React, {useContext, useEffect, useState } from 'react';
import './UserLogin.css';
import {UserContext} from '../../App.js'
import axios from 'axios';

import {Link, AppBar, Toolbar, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function UserLogin(props) {
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
        
      await  axios.post('http://localhost:6233/api/login',formValues).then((response)=>{
              console.log("im in userlogin");
            setloginValues(response.data);
            
            console.log("data",response.data);
            props.setUserData(response.data);
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
    
     function redirected(){  
        
    //    console.log(formValues.username);
    //    console.log(username);
    console.log("full",loginValues.id);
       if( loginValues && (loginValues.username==formValues.username)) {
        Cookies.set('log',2); 
        // props.setLogInfo(Cookies.get("log")) ;
       
        dispatch({type:"USER", payload:"isUser"});
          navigate(`/user/${loginValues.id}`,{replace:true});
          console.log("Admin Login");
       }
    
    
       
       else
       {  navigate("#",{replace:true});
       console.log("Invalid login");
    }
    }
    
    
    

        return (
            <div>
               
                {/* { (isSubmit &&  isAuth) ?(<Header Values={loginValues}/>):<pre className='pretext'>Invalid Login Credentials</pre>} */}
                
                <div className="uselog">
                <Link href='/admin/login' className="adminlog" >Admin Login</Link> 
                    <Link href='/user/login' className="userlog">User Login</Link> 
                    
                    <form onSubmit={handleSubmit}>
                    <label for="chk" aria-hidden="true">Sign In</label>
                            <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                            
                            
                            <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                            { isSubmit &&  loginValues.status==="Authentication failed" ?(<h3>Invalide credentials</h3>):(<h3></h3>)}
                            <button type="submit">Sign In</button>
                    </form>
                </div>
                 
            </div>
           
        );
}

export default UserLogin;