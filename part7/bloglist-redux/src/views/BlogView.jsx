import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { LogoutBar } from "../components/LogoutBar";
import { getBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

export function BlogView() {
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:blogId");
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const currentUser = useSelector(({ user }) => user.loggedInUser);
  const blogId = match.params.blogId;
  const blog = match ? blogs.find((blog) => blog.id === blogId) : null;

  if (!blog) {
    return null;
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(getBlogs());
    }
  };

  const handleLike = () => {
    const blog = blogs.find((blog) => blog.id === blogId);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .update(blogId, changedBlog)
      .then(() => {
        dispatch(getBlogs());
      })
      .catch(() => {
        dispatch(setNotification("Unable to like blog", "error", 5));
        dispatch(getBlogs());
      });
  };

  const showDeleteButton = blog.user.name === currentUser.name ? "" : "none";

  return (
    <div>
      <LogoutBar />
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button onClick={removeBlog} style={{ display: showDeleteButton }}>
        remove
      </button>
    </div>
  );
}