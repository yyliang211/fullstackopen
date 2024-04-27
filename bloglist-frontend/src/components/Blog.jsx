import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [expanded, setExpanded] = useState(false);
  const display = expanded ? "" : "none";
  const buttonLabel = expanded ? "hide" : "view";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(!expanded)}>{buttonLabel}</button>
      </div>
      <div style={{ display: display }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
