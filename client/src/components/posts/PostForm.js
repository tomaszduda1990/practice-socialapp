import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost: addPostHandler }) => {
  const [text, setText] = useState("");
  const onTextChangeHandler = (e) => {
    const textValue = e.target.value;
    setText(textValue);
  };
  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    addPostHandler({ text });
    setText("");
  };
  return (
    <>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say something...</h3>
        </div>
        <form className="form my-1" onSubmit={onCommentSubmitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="10"
            required
            placeholder="Create a post"
            value={text}
            onChange={onTextChangeHandler}
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
