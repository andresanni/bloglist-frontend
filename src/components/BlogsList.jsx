import { Table } from "react-bootstrap";
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

    <div className="d-flex flex-column justify-content-center align-items-center" >
      <h2 className="mt-4">Blogs</h2>

      <Table striped className="border p-4 rounded shadow mt-4 text-start" style={{ maxWidth: '500px', width: '100%' }}>
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
      </Table>

      <ul>{}</ul>
    </div>
  );
};

export default BlogList;
