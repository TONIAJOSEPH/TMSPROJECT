import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./footer.css";

const Footer = () => {
	return (
		<div className='footer-container'>
			
			<div className='footer-links'>
				<div className='footer-link-wrapper'>
					{/* <div className='footer-link-items'>
						<h2>About Us</h2>
						<p>
							Information and Communication Technology Academy of Kerala is an
							organisation established by Government of Kerala to enhance the
							quality of graduates in the information technology sector and to
							generate resources for increasing the employability of students.
						</p>
					</div> */}
					<div className='footer-link-items'>
						<h2>Contact Us</h2>
						<p>G1, Ground Floor, Thejaswini Building, Technopark,</p>
						<p>Thiruvananthapuram, Kerala, India.</p>
						<p>Mobile: 7594051437, Phone: +91-471-2700811</p>
					</div>
				</div>
			</div>
			<section className='social-media'>
				<div className='social-media-wrap'>
					<div className='footer-logo'>
						<Link to='/' className='social-logo'>
							ICTAK-TMS
						</Link>
					</div>
					<small className='website-rights'>ICTAK-TMS © 2022</small>
					<div className='social-icons'>
						<Link
							className='social-icon-link facebook'
							to='/'
							target='_blank'
							aria-label='Facebook'
						>
							<i className='fab fa-facebook-f'></i>
						</Link>
						<Link
							className='social-icon-link instagram'
							to='/'
							target='_blank'
							aria-label='Instagram'
						>
							<i className='fab fa-instagram'></i>
						</Link>
						<Link
							className='social-icon-link youtube'
							to='/'
							target='_blank'
							aria-label='Youtube'
						>
							<i className='fab fa-youtube'></i>
						</Link>
						<Link
							className='social-icon-link twitter'
							to='/'
							target='_blank'
							aria-label='Twitter'
						>
							<i className='fab fa-twitter'></i>
						</Link>
						<Link
							className='social-icon-link linkedin'
							to='/'
							target='_blank'
							aria-label='LinkedIn'
						>
							<i className='fab fa-linkedin'></i>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Footer;
