import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, currentUser, handleLike, removeBlog }) => {
  const [expanded, setExpanded] = useState(false);
  const display = expanded ? "" : "none";
  const buttonLabel = expanded ? "hide" : "view";
  const showDeleteButton = blog.user.name === currentUser.name ? "" : "none";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="standardContent">
        {blog.title} {blog.author}
        <button id="viewButton" onClick={() => setExpanded(!expanded)}>
          {buttonLabel}
        </button>
      </div>
      <div style={{ display: display }} className="detailedContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={removeBlog} style={{ display: showDeleteButton }}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
