import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading ? (
				<Redirect to='/login' />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.protoTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
