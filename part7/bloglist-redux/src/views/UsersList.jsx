import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogoutBar } from "../components/LogoutBar";
import userService from "../services/users";

export function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <>
      <LogoutBar />
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
