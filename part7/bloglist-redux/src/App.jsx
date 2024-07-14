import {
  Button,
  Container,
  Notification,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { getBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { getUsers, setLoggedInUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { BlogList } from "./views/BlogList";
import { BlogView } from "./views/BlogView";
import { UserView } from "./views/UserView";
import { UsersList } from "./views/UsersList";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser = useSelector(({ user }) => {
    return user.loggedInUser;
  });
  const users = useSelector(({ user }) => {
    return user.users;
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
      dispatch(setLoggedInUser(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(setNotification("wrong username or password", "error", 3));
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <TextInput
        label="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        data-testid="usernameInput"
      />
      <PasswordInput
        label="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        data-testid="passwordInput"
      />
      <Button type="submit" id="login-button">
        login
      </Button>
    </form>
  );

  if (loggedInUser === null) {
    return (
      <Container size="xs" padd>
        <h2>Log in to application</h2>
        {notification.message !== "" && (
          <Notification
            title={notification.className}
            color={notification.className === "error" ? "red" : undefined}
          >
            {notification.message}
          </Notification>
        )}
        {loginForm()}
      </Container>
    );
  }

  return (
    <Container>
      <Menu />

      <h2>blog app</h2>
      {notification.message !== "" && (
        <Notification
          title={notification.className}
          color={notification.className === "error" ? "red" : undefined}
        >
          {notification.message}
        </Notification>
      )}

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:blogId" element={<BlogView />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserView />} />
      </Routes>
    </Container>
  );
};

export default App;
