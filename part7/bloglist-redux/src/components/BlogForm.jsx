import { Button, TextInput } from "@mantine/core";
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
        <TextInput
          label="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="write title"
        />
        <TextInput
          label="author"
          id="author"
          value={author}
          onChange={handleAuthorChange}
          placeholder="write author"
        />
        <TextInput
          label="url"
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="write url"
        />
        <Button type="submit">save</Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
