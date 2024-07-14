import { Table } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function UsersList() {
  const users = useSelector(({ user }) => user.users);

  return (
    <>
      <h2>Users</h2>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col"></Table.Th>
            <Table.Th scope="col">blogs created</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => {
            return (
              <Table.Tr key={user.username}>
                <Link to={`${user.id}`}>{user.name}</Link>
                <Table.Td>{user.blogs.length}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
}
