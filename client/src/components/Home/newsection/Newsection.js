import React from "react";
import "../../../App.css";
import Button from "../button/Button";
import "./newsection.css";
import { Link } from "react-router-dom";

const Newsection = () => {
	return (
		<div className='hero-container'>
			<video src='./videos/video-2.mp4' autoPlay loop muted />
			<h3>Welcome</h3>
			<h5>ICTAK - TRAINING MANAGEMENT SYSTEM</h5>
			<div className='hero-btns'>
				<Link to='/register'>
					<Button
						className='btns'
						buttonStyle='btn--outline'
						buttonSize='btn--large'
					>
						REGISTER <i class='fa-solid fa-user-plus'></i>
					</Button>
				</Link>
				
			</div>
			
		</div>
	);
};

export default Newsection;
