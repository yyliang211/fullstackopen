import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { Notification } from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const emptyNotification = { message: null, className: null };
  const [notification, setNotification] = useState(emptyNotification);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });
    setNotification({
      message: `a new blog ${newTitle} by ${newAuthor} added`,
      className: "success",
    });
    setTimeout(() => {
      setNotification(emptyNotification);
    }, 3000);
  };

  const handleLike = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
      })
      .catch(() => {
        setNotification({
          message: "Unable to like blog",
          className: "error",
        });
        setTimeout(() => {
          setNotification(emptyNotification);
        }, 5000);
        setBlogs(blogs.filter((b) => b.id !== id));
      });
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setNotification({
        message: "wrong username or password",
        className: "error",
      });
      setTimeout(() => {
        setNotification(emptyNotification);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    return;
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.message}
          className={notification.className}
        />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        className={notification.className}
      />

      <div>
        <p>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            onSubmit={addBlog}
            title={newTitle}
            handleTitleChange={handleTitleChange}
            author={newAuthor}
            handleAuthorChange={handleAuthorChange}
            url={newUrl}
            handleUrlChange={handleUrlChange}
          />
        </Togglable>
      </div>

      {blogs
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
};

export default App;
