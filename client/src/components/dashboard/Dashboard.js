import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentUserProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Spinner from '../layout/Spinner';
import Education from './Education';

const Dashboard = ({
	auth: { user },
	profile: { profile, loading },
	getCurrentUserProfile,
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentUserProfile();
	}, [getCurrentUserProfile]);

	const profileLoaded = !!(profile && Object.keys(profile).length);
	return loading && !profileLoaded ? (
		<>
			<Spinner size={'medium'} />
		</>
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Welcome {user && user.name}
			</p>
			{profileLoaded ? (
				<>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-2'>
						<button className='btn btn-danger' onClick={deleteAccount}>
							<i className='fas fa-user-minus' /> {'  '}
							<span>Remove account</span>
						</button>
					</div>
				</>
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
	getCurrentUserProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, {
	getCurrentUserProfile,
	deleteAccount,
})(Dashboard);
