import React, { useState,useEffect,useReducer,createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/navbar/Navbar";
import "./App.css";
import Home from "./components/Home/pages/Home";
import Signup from "./components/Admin/Signup";
import Login from "./components/Admin/Login";
import Userlist from './components/Admin/userdetails/Userlist';
import Approved from './components/Admin/admin/Approved';
import Scheduled from './components/Admin/Scheduled/Scheduled';
import Footer from "./components/Home/footer/Footer";
import UserLogin from "./components/User/UserLogin";
import User from './components/User/User.js'
import Logout from './components/Logout'
import Cookies from "js-cookie";
import { initialState,reducer } from "./reducer/UserReducer";

export const UserContext = createContext();


function App() {

	
	const [userData,setUserData]= useState({});
	
	var logs = Cookies.get("log");
	console.log("tough",Cookies.get("log"));
	
	const [state, dispatch] = useReducer(reducer, initialState);

	

		return (
			<>
				<div className='App'>
				
				<UserContext.Provider value={{state, dispatch}}>
					
					<Router>
					<Navbar/>
					<Routes>
						<Route path='/admin/home' element={<Userlist/>}/>
						<Route path="/admin/approvedlist" element={<Approved/>}></Route>
						<Route path="/admin/scheduledlist" element={<Scheduled/>}></Route>
						<Route path='/user/:id' element={<User userData={userData}/>}/>
						<Route path='/' exact element={<Home />} />
						<Route path='/register' element={<Signup/>} />
						<Route path='/admin/login' element={<Login />} />
						<Route path='/user/login' element={<UserLogin setUserData={setUserData}/>} />
						<Route path='/logout' element={<Logout/>} />
  					</Routes>
        				
       				</Router>
      			</UserContext.Provider>
				</div>
			</>
		);
	}


	


export default App;
