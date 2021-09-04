import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment: addCommentHanlder, postId }) => {
  const [text, changeText] = useState("");
  const onTextChange = (e) => {
    changeText(e.target.value);
  };
  return (
    <>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment!</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addCommentHanlder(postId, { text });
            changeText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="10"
            required
            placeholder="Comment post"
            value={text}
            onChange={onTextChange}
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
