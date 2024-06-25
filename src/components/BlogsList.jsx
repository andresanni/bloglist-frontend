import { useFetchBlogs } from "../hooks/blogs";
import { Link } from "react-router-dom";

const BlogList = () => {
  const { isLoading, isError, data, error } = useFetchBlogs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const blogs = data;
  return (
    <div>
      <h2>blogs</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {blogs.map((blog) => (
            <tr key={ blog.id }>
              <td><Link to={`/blogs/${ blog.id }`}>{ blog.title }</Link></td>
              <td><Link to={`/users/${ blog.author.id }`}>{blog.author.username}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul>{}</ul>
    </div>
  );
};

export default BlogList;
