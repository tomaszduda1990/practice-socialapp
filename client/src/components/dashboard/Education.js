import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation: deleteEducationHandler }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : "NOW"}
      </td>
      <td>
        <button
          type="button"
          onClick={() => deleteEducationHandler(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Education credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
