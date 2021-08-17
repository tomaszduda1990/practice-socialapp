import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			<ul>
				<li>
					<NavLink to='/profiles'>Developers</NavLink>
				</li>
				<li>
					<NavLink to='/register'>Register</NavLink>
				</li>
				<li>
					<NavLink to='/login'>Login</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
