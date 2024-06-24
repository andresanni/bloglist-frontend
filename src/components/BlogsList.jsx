import { useFetchBlogs } from '../hooks/blogs';
import Blog from './Blog';

const BlogList = () => {
  
  const {isLoading, isError, data, error} = useFetchBlogs();
  
  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error: {error.message}</div>
  }
  
  const blogs = data;
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}         
        />
      ))}
    </div>
  );
};

export default BlogList;
