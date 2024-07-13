import React, { useEffect, useState } from "react";
import userService from "../services/users";

export function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((res) => {
      console.log("result", res);
      setUsers(res);
    });
  }, []);

  console.log(users);

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
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
