import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { BlogList } from "./components/BlogList";
import { Menu } from "./components/Menu";
import { Notification } from "./components/Notification";
import { getBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(({ user }) => {
    return user;
  });
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(setNotification("wrong username or password", "error", 3));
    }
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
          data-testid="usernameInput"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="passwordInput"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
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

      <Menu />
      <Notification
        message={notification.message}
        className={notification.className}
      />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<></>} />
      </Routes>
    </div>
  );
};

export default App;
