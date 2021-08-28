import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';

const Profile = ({
	profile: { profile, loading },
	auth,
	getProfileById,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return profile === null || loading ? (
		<Spinner size='medium' />
	) : (
		<>
			<Link to='/profiles' className='btn btn-light'>
				Back to profiles
			</Link>
			{profile.user._id === auth.user._id && auth.isAuthenticated && (
				<Link to='/edit-profile' className='btn btn-dark'>
					Edit profile
				</Link>
			)}
			<div class='profile-grid my-1'>
				<ProfileTop profile={profile} />
				<ProfileAbout profile={profile} />

				<div class='profile-exp bg-white p-2'>
					<h2 class='text-primary'>Experience</h2>
					<div>
						<h3 class='text-dark'>Microsoft</h3>
						<p>Oct 2011 - Current</p>
						<p>
							<strong>Position: </strong>Senior Developer
						</p>
						<p>
							<strong>Description: </strong>Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
							ipsam, sapiente suscipit dicta eius velit amet aspernatur
							asperiores modi quidem expedita fugit.
						</p>
					</div>
					<div>
						<h3 class='text-dark'>Sun Microsystems</h3>
						<p>Nov 2004 - Nov 2011</p>
						<p>
							<strong>Position: </strong>Systems Admin
						</p>
						<p>
							<strong>Description: </strong>Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
							ipsam, sapiente suscipit dicta eius velit amet aspernatur
							asperiores modi quidem expedita fugit.
						</p>
					</div>
				</div>

				<div class='profile-edu bg-white p-2'>
					<h2 class='text-primary'>Education</h2>
					<div>
						<h3>University Of Washington</h3>
						<p>Sep 1993 - June 1999</p>
						<p>
							<strong>Degree: </strong>Masters
						</p>
						<p>
							<strong>Field Of Study: </strong>Computer Science
						</p>
						<p>
							<strong>Description: </strong>Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
							ipsam, sapiente suscipit dicta eius velit amet aspernatur
							asperiores modi quidem expedita fugit.
						</p>
					</div>
				</div>

				<div class='profile-github'>
					<h2 class='text-primary my-1'>
						<i class='fab fa-github'></i> Github Repos
					</h2>
					<div class='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									Repo One
								</a>
							</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Repellat, laborum!
							</p>
						</div>
						<div>
							<ul>
								<li class='badge badge-primary'>Stars: 44</li>
								<li class='badge badge-dark'>Watchers: 21</li>
								<li class='badge badge-light'>Forks: 25</li>
							</ul>
						</div>
					</div>
					<div class='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									Repo Two
								</a>
							</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Repellat, laborum!
							</p>
						</div>
						<div>
							<ul>
								<li class='badge badge-primary'>Stars: 44</li>
								<li class='badge badge-dark'>Watchers: 21</li>
								<li class='badge badge-light'>Forks: 25</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
