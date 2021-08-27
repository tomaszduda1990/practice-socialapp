import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ loading, isAuthenticated, logout }) => {
	const loggedOutNavElements = (
		<>
			<li>
				<NavLink to='/profiles'>Developers</NavLink>
			</li>
			<li>
				<NavLink to='/register'>Register</NavLink>
			</li>
			<li>
				<NavLink to='/login'>Login</NavLink>
			</li>
		</>
	);
	const loggedIndNavLinks = (
		<>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user-alt'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<NavLink to='/profiles'>Developers</NavLink>
			</li>
			<li>
				<Link onClick={logout} to='/login'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</Link>
			</li>
		</>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!loading && (
				<ul>{isAuthenticated ? loggedIndNavLinks : loggedOutNavElements}</ul>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
