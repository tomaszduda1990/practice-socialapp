import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation: addEducationHandler, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "",
  });
  const { school, degree, fieldofstudy, from, to, description } = formData;
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducationHandler(formData, history);
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Add education record</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any schools that you have been
        in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            value={school}
            onChange={(e) => onChange(e)}
            placeholder="* School"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={degree}
            onChange={(e) => onChange(e)}
            placeholder="* Degree"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            placeholder="Field of study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
            placeholder="School Description"
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
