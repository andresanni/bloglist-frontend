import Blog from './Blog'

const BlogList = ({ blogs , handleIncrementLikes}) => {
  
    return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleIncrementLikes = {handleIncrementLikes}/>
      ))}
    </div>
  );
};

export default BlogList;
