import { useEffect } from "react";
import { useDeleteBlog, useUpdateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { useFetchBlogs } from "../hooks/blogs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewCommentForm from './NewCommentForm'

const BlogDetails = () => {
    
  const updateBlogMutation = useUpdateBlog();
  const { isSuccess: deleteSuccess, mutate: deleteMutate } = useDeleteBlog();
  const { setNotification } = useNotification();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: blog, isLoading, isError, error } = useFetchBlogs(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteSuccess) {
      setNotification("Blogpost deleted", "success");
      navigate("/list");
    }
  }, [deleteSuccess]);

  const handleIncrementLikes = () => {
    const incrementedBlog = {
      ...blog,
      likes: blog.likes + 1,
      author: blog.author.id,
    };
    updateBlogMutation.mutate(incrementedBlog);
  };

  const handleDelete = () => {
    if (window.confirm("Do you really want to delete this post?")) {
      deleteMutate(blog.id);
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Added by {blog.author.username}</p>
      <button onClick={handleIncrementLikes}>Like</button>
      {user.id === blog.author.id && (
        <button onClick={handleDelete}>Delete</button>
      )}
      <h2>Comments</h2>
      <NewCommentForm blog={ blog }/>
      <ul>
        { blog.comments.length>0 ? 
        blog.comments.map((comment)=><li>{comment}</li>)
        :
        <p>No comments yet</p>
        }
      </ul>
    </div>
  );
};

export default BlogDetails;
