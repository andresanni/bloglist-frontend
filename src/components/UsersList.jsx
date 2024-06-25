import { Link } from "react-router-dom";
import { useFetchUsers } from "../hooks/users";

const UsersList = () => {

  const {data: users, isLoading, isError, error} = useFetchUsers();

  if(isLoading){
    return <p>is Loading</p>
  }

  if(isError){
    <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h2>Users</h2>

      <table>
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
      </table>
    </div>
  );
};

export default UsersList;
