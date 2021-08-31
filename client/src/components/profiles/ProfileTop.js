import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: { user, company, location, status, social = {}, website },
}) => {
  const socialMediaLinks = [];
  if (Object.keys(social).length) {
    Object.keys(social).forEach((key) => {
      socialMediaLinks.push(
        <a
          key={`${key}-social-media-link`}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-${key}`} />
        </a>
      );
    });
  }
  if (website)
    socialMediaLinks.unshift(
      <a
        key="website-social-media-link"
        href={website}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-globe" />
      </a>
    );
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="user avatar" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company && `at ${company}`}
      </p>
      <p>{location}</p>
      <div className="icons my-1">{socialMediaLinks}</div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.shape({}).isRequired,
};

export default ProfileTop;
