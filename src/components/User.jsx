import { useParams } from "react-router-dom";
import { useFetchUsers } from "../hooks/users";

const User = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useFetchUsers(id);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>{user.username}</h1>
      <h2>Blogposts</h2>
      <ul>
        {user.blogposts.length > 0 ? (
          user.blogposts.map((blogpost) => (
            <li key={blogpost.id}>{blogpost.title}</li>
          ))
        ) : (
          <p>No blogposts yet</p>
        )}
      </ul>
    </>
  );
};

export default User;
