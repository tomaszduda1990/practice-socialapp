import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById: getProfileByIdHandler,
  match,
}) => {
  useEffect(() => {
    getProfileByIdHandler(match.params.id);
  }, [getProfileByIdHandler, match.params.id]);
  return profile === null || loading ? (
    <Spinner size="medium" />
  ) : (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back to profiles
      </Link>
      {profile.user._id === auth.user._id && auth.isAuthenticated && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit profile
        </Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            profile.experience.map((exp) => {
              return <ProfileExperience key={exp._id} experience={exp} />;
            })
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            profile.education.map((edu) => {
              return <ProfileEducation key={edu._id} education={edu} />;
            })
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
