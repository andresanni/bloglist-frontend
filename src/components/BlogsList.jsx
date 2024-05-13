import Blog from './Blog';

const BlogList = ({ blogs, handleIncrementLikes, handleDelete, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleIncrementLikes={handleIncrementLikes}
          handleDelete={handleDelete}
          user = {user}
        />
      ))}
    </div>
  );
};

export default BlogList;
