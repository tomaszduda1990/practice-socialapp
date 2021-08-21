import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({
	auth: { user },
	profile: { profile, loading },
	getCurrentUserProfile,
}) => {
	useEffect(() => {
		getCurrentUserProfile();
	}, []);
	return loading && profile === null ? (
		<>
			<Spinner size={'medium'} />
		</>
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>has profile</>
			) : (
				<>
					<p>You don't have a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</>
	);
};

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
