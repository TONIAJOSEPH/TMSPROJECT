import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import validation from './validation';
import axios from 'axios';
import './Signup.css';
import { Button, MenuItem } from '@mui/material';


function Signup(props) {

    var allCourses= [
        {value:'first',label:'CSA'},
        {value:'second',label:'FSD'},{value:'third',label:'DSA'},{value:'fourth',label:'RPA'}];

         // Storing Form Field Values
    var [formValues, setFormValues] = useState({ username: "",fname: "",sname: "", email: "",
                                               password: "",job:"",org:'' ,skill:'' ,quali:"",mobile:""});
    
    var [course,setCourse]=useState(null);
    
    var [courseid,setCourseid]=useState("");

    var approval=false;
    

    // Manage Form Error Values
    const [formErrorValues, setFormErrorValues] = useState({});
    var [Values, setValues] = useState();
    
    var [display,setDisplay]=useState(null);
    // Flag for Form Submission Status
    const [isSubmit, setIsSubmit] = useState(false); 
    const [image,setImage]=useState({})

    console.log(formValues);
    console.log(course);
    
    // Manage Field Change
    const  handleChange = (event) => {
        const { name, value } = event.target; 
        setFormValues({ ...formValues, [name]: value }); 
    }
    const filechange=(event)=>{
      setImage(event.target.files[0]);
      }


      const changecourse=(e)=>{
        var labels="";
        e.map((i)=>{
         labels += i.label+" ";
        })
        setCourse(labels);
        console.log(course);
        
      }


    // Manage Form Refresh
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrorValues(validation(formValues));
        setIsSubmit(true);
        console.log(Values);
        nullify();
    }

    useEffect(() => {
         
            register();
        
    }, [formErrorValues]);

    function register(){

      const formData=new FormData();
    formData.append("myfile",image);
    formData.append("fname",formValues.fname);
    formData.append("sname",formValues.sname);
    formData.append("username",formValues.username);
    formData.append("email",formValues.email);
    formData.append("password",formValues.password);
    formData.append("quali",formValues.quali);
    formData.append("skill",formValues.skill);
    formData.append("org",formValues.org);
    formData.append("job",formValues.job);
    formData.append("course",course);
    formData.append("approval",approval);
    // {formValues,course,approval}
        
            axios.post('/api/register',formData)
            .then((response)=>
            {
              console.log(response.data);
              
                setValues(response.data);
              
            })

            setFormValues({ username: "",fname: "",sname: "", email: "",
                password: "",job:"",org:'' ,skill:'' ,quali:"",});
            setCourse(null);
          }

          function nullify(){
            if(isSubmit && formValues.username==Values.username){

              setDisplay("Registration Successfull");
                setFormValues({ username: "",fname: "",sname: "", email: "",
                password: "",job:"",org:'' ,skill:'' ,quali:"",});
              
              
              setIsSubmit(false);

            }

            if(isSubmit && Values=='Username or Email already exists' ){
              setDisplay("Username or Email already exists")
              setIsSubmit(false);
            }
          }
    return (
        <div>
          
            <div className="body-content">
  <div className="module">
  <h1>Trainee Enroll Form</h1>
   {/* <h3>Enter The Required Data</h3> */}
   <h3>{display}</h3>
    <form className="form"  enctype="multipart/form-data" onSubmit={handleSubmit} >
      <div className="alert alert-error"></div>
      <input type="text" id="name" onChange={handleChange} name="fname" value={formValues.fname} className="form" required placeholder="First name"/>
      <input type="text" id="name" onChange={handleChange} name="sname" value={formValues.sname} className="form" required placeholder="Last name"/>
      <input type="text" id="username" onChange={handleChange}  name="username" value={formValues.username} className="form" required placeholder=" User Name"/>
      <input type="email" id="email" onChange={handleChange} name="email" value={formValues.email} className="form" required placeholder="Email"/>
      <input type="text" id="qualification" onChange={handleChange} name="quali" value={formValues.quali} className="form" placeholder="Qualification"  required/>
      <input type="text" id="organization" onChange={handleChange} name="org" value={formValues.org} className="form" placeholder="Organization"  required/>
      <input type="text" id="designation" onChange={handleChange} name="job" value={formValues.job} className="form" placeholder="Designation"  required/>
      <label id="skill-label">Courses Handling</label>
      <Select className='drop' options={allCourses} isMulti onChange={changecourse}/>
      
     <label id="skill-label">Skills</label>
      <input type="text" id="skill" onChange={handleChange} name="skill" value={formValues.skill} className="form" placeholder="skill 1,skill 2,..."  required/>
    <input type="password" id="password" onChange={handleChange} name="password" value={formValues.password} className="form" required placeholder="Insert your password"/>
      <div className="avatar"><label>choose your image: </label><input type="file" filename="myfile"  required onChange={filechange}/></div>
      <input type="submit" value="Register" name="register" class="btn btn-block btn-primary" />
    </form>
  </div>
  
</div>
        </div>
    );
}

export default Signup;