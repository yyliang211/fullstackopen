import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
      likes: 0,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="write title"
          />
        </div>
        <div>
          author:{" "}
          <input
            value={author}
            onChange={handleAuthorChange}
            placeholder="write author"
          />
        </div>
        <div>
          url:{" "}
          <input
            value={url}
            onChange={handleUrlChange}
            placeholder="write url"
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
