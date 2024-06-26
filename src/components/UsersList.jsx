import { Link } from "react-router-dom";
import { useFetchUsers } from "../hooks/users";
import { Table } from "react-bootstrap";

const UsersList = () => {

  const {data: users, isLoading, isError, error} = useFetchUsers();

  if(isLoading){
    return <p>is Loading</p>
  }

  if(isError){
    <p>Error: {error.message}</p>
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mt-4">Users</h2>

      <Table striped className="border p-4 rounded shadow mt-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <tbody>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogposts.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
