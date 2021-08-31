import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubProfiles } from "../../actions/profile";

const ProfileGithub = ({
  username,
  getGithubProfiles: getGithubProfilesHandler,
  repos,
}) => {
  useEffect(() => {
    console.log("profile github component effect");
    getGithubProfilesHandler(username);
  }, [getGithubProfilesHandler]);
  return (
    <div className="profile-github">
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => {
          return (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.desciption}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-primary">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubProfiles: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubProfiles })(ProfileGithub);
