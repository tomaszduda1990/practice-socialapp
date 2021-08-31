import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">
            {name.trim().split(" ")[0]}&apos;s Bio
          </h2>
          <p>{bio}</p>
        </>
      )}
      <div className="line" />
      {skills.length && (
        <>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skills.map((skill) => (
              <div className="p-1" key={`skill-${skill}`}>
                <i className="fa fa-check" /> {skill.toUpperCase()}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.shape({}).isRequired,
};

export default ProfileAbout;
