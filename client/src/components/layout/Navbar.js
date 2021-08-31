import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ loading, isAuthenticated, logout: logoutHandler }) => {
  const loggedOutNavElements = (
    <>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );
  const loggedIndNavLinks = (
    <>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user-alt" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <Link onClick={logoutHandler} to="/login">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
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

Navbar.defaultProps = {
  isAuthenticated: false,
  loading: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
