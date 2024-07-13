import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../reducers/userReducer";

export function LogoutBar() {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => {
    return user.loggedInUser;
  });
  const handleLogout = () => {
    dispatch(setLoggedInUser(null));
    return;
  };

  return (
    <>
      {user.name} logged-in <button onClick={handleLogout}>logout</button>
    </>
  );
}
