import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

export function BlogList() {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const user = useSelector(({ user }) => {
    return user;
  });

  const handleLike = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .update(id, changedBlog)
      .then(() => {
        dispatch(getBlogs());
      })
      .catch(() => {
        dispatch(setNotification("Unable to like blog", "error", 5));
        dispatch(getBlogs());
      });
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(getBlogs());
    }
  };

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        "success",
        3,
      ),
    );
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    return;
  };

  return (
    <div>
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog.id)}
            removeBlog={() => removeBlog(blog)}
            currentUser={user}
          />
        ))}
    </div>
  );
}
