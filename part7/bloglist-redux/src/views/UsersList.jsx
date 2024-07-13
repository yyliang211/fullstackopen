import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function UsersList() {
  const users = useSelector(({ user }) => user.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <Link to={`${user.id}`}>{user.name}</Link>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
