import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedInUser } from "../reducers/userReducer";

const padding = {
  paddingRight: 5,
};

const menuStyle = {
  background: "lightgray",
  padding: "5px",
};

export function Menu() {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => {
    return user.loggedInUser;
  });
  const handleLogout = () => {
    dispatch(setLoggedInUser(null));
    return;
  };

  return (
    <div style={menuStyle}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged-in <button onClick={handleLogout}>logout</button>
    </div>
  );
}
