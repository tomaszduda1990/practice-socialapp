import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
	useEffect(() => {
		getAllProfiles();
	}, []);
	return (
		<>
			{loading && !profiles ? (
				<Spinner size='medium' />
			) : (
				<>
					<h1 className='large text-primary'>Developers</h1>
					<p>
						<i className='fab fa-connectdevelop'></i> Connect with other
						developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((p) => {
								return <ProfileItem key={p._id} profile={p} />;
							})
						) : (
							<h4>No profiles found</h4>
						)}
					</div>
				</>
			)}
		</>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
