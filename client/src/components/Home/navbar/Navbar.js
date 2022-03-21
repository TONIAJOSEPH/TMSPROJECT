import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { UserContext } from '../../../App.js';
// import Button from "../button/Button";

const Navbar = () => {

	const { state, dispatch } = useContext(UserContext)
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	if (state == "isAdmin") {

		return (
			<>
				<nav className='nav-bar'>
					<div className='navbar-container'>
						<Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
							ICTAK-TMS <i className='fa-solid fa-graduation-cap'></i>
						</Link>
						<div className='menu-icon' onClick={handleClick}>
							<i className={click ? "fas fa-times" : "fas fa-bars"} />
						</div>
						<ul className={click ? "nav-menu active" : "nav-menu"}>
							<li className='nav-item'>
								<Link to='/admin/home' className='nav-links' onClick={closeMobileMenu}>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									to='/admin/approvedlist'
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Approved Trainees
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/admin/scheduledlist' className='nav-links' onClick={closeMobileMenu}>
									Trainees Schedule
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</>
		)

	}

	else if (state == "isUser") {

		return (
			<>
				<nav className='nav-bar'>
					<div className='navbar-container'>
						<Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
							ICTAK-TMS <i className='fa-solid fa-graduation-cap'></i>
						</Link>
						<div className='menu-icon' onClick={handleClick}>
							<i className={click ? "fas fa-times" : "fas fa-bars"} />
						</div>
						<ul className={click ? "nav-menu active" : "nav-menu"}>
							<li className='nav-item'>
								<Link to='/user/:id' className='nav-links' onClick={closeMobileMenu}>
									Profile
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/user/schedule' className='nav-links' onClick={closeMobileMenu}>
									Schedule
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
									Logout
								</Link>
							</li>
							</ul>
					</div>
				</nav>
			</>
		)

	}

	else if (state == "isLogout") {

		return (
			<>
				<nav className='nav-bar'>
					<div className='navbar-container'>
						<Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
							ICTAK-TMS <i className='fa-solid fa-graduation-cap'></i>
						</Link>
						<div className='menu-icon' onClick={handleClick}>
							<i className={click ? "fas fa-times" : "fas fa-bars"} />
						</div>
						<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className='nav-item'>
						<Link to='/' className='nav-links' onClick={closeMobileMenu}>
						Home
						</Link>
						</li>
						<li className='nav-item'>
						<Link
						to='/register'
						className='nav-links'
						onClick={closeMobileMenu}
						>
						Register
						</Link>
						</li><li className='nav-item'>
						<Link to='/admin/login' className='nav-links' onClick={closeMobileMenu}>
							Login
						</Link>
						</li>
						</ul>
					</div>
				</nav>
			</>
		)

	}
	else{

		return (
			<>
				<nav className='nav-bar'>
					<div className='navbar-container'>
						<Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
							ICTAK-TMS <i className='fa-solid fa-graduation-cap'></i>
						</Link>
						<div className='menu-icon' onClick={handleClick}>
							<i className={click ? "fas fa-times" : "fas fa-bars"} />
						</div>
						<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className='nav-item'>
						<Link to='/' className='nav-links' onClick={closeMobileMenu}>
						Home
						</Link>
						</li>
						<li className='nav-item'>
						<Link
						to='/register'
						className='nav-links'
						onClick={closeMobileMenu}
						>
						Register
						</Link>
						</li><li className='nav-item'>
						<Link to='/admin/login' className='nav-links' onClick={closeMobileMenu}>
							Login
						</Link>
						</li>
						</ul>
					</div>
				</nav>
			</>
		)

	}

};

export default Navbar;
