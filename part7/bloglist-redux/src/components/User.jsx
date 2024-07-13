import React from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { LogoutBar } from "./LogoutBar";

export function User() {
  const match = useMatch("/users/:userId");
  const users = useSelector(({ user }) => user.users);
  const selectedUser = match
    ? users.find((user) => user.id === match.params.userId)
    : null;

  return (
    <>
      <LogoutBar />
      <h2>{selectedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </>
  );
}
