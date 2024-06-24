import usersService from '../services/users';
import { useState, useEffect } from "react";

const UsersList = () => {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    usersService.getAll().then(data=> setUsers(data))
  },[])




  return <div>
    <h2>Users</h2>
    <ul>
      {
        users.map((user) => {
          return <li key={user.id}>{user.username} {user.blogposts.length}</li>
        } )
      }
    </ul>
  </div>;
};

export default UsersList;
