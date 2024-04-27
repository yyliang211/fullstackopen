import PropTypes from "prop-types";

const BlogForm = ({
  onSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          title: <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
};

export default BlogForm;
