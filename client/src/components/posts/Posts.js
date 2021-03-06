import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { getAllPosts } from "../../actions/post";
import PostForm from "./PostForm";

const Posts = ({
  getAllPosts: getAllPostsHandler,
  post: { loading = true, posts = {} },
}) => {
  useEffect(() => {
    getAllPostsHandler();
  }, [getAllPostsHandler]);
  return loading ? (
    <Spinner size="medium" />
  ) : (
    <>
      {posts && posts.length > 0 ? (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" />
            Welcome to community
          </p>
          <div className="posts">
            <PostForm />
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <p>no posts</p>
      )}
    </>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
