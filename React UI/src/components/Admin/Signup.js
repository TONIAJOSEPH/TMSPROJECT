import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import validation from './validation';
import axios from 'axios';
import './Signup.css';


function Signup(props) {

    var allCourses= [
        {value:'first',label:'CSA'},
        {value:'second',label:'FSD'},{value:'third',label:'DSA'},{value:'fourth',label:'RPA'}];

         // Storing Form Field Values
    var [formValues, setFormValues] = useState({ username: "",fname: "",sname: "", email: "",
                                               password: "",job:"",org:'' ,skill:'' ,quali:"",mobile:""});
    
    var [course,setCourse]=useState(null);
    
    var approval=false;
    

    // Manage Form Error Values
    const [formErrorValues, setFormErrorValues] = useState({});
    var [Values, setValues] = useState();
    
    var [display,setDisplay]=useState(null);
    // Flag for Form Submission Status
    const [isSubmit, setIsSubmit] = useState(false); 

    console.log(formValues);
    console.log(course);
    
    // Manage Field Change
    const  handleChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target; //destructuring
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
        
    }

    // const courseHandler=(event)=>{
    //   setCourse(event.label);

    // }
    // Array.isArray(event)?event.map(x=>x.label):[]

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

        
            axios.post('/api/register',{formValues,course,approval})
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
   <h3>Enter The Required Data</h3>
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
      <Select className='drop' options={allCourses} isMulti onChange={setCourse}  />
      <label id="skill-label">Skills</label>
      <input type="text" id="skill" onChange={handleChange} name="skill" value={formValues.skill} className="form" placeholder="skill 1,skill 2,..."  required/>
    <input type="password" id="password" onChange={handleChange} name="password" value={formValues.password} className="form" required placeholder="Insert your password"/>
      {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
      <input type="submit" value="Register" name="register" class="btn btn-block btn-primary" />
    </form>
  </div>
  
</div>
        </div>
    );
}

export default Signup;