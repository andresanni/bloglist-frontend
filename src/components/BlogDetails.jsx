import { useEffect } from "react";
import { useDeleteBlog, useUpdateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { useFetchBlogs } from "../hooks/blogs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import { Button, ListGroup } from "react-bootstrap";

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
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <div
        className="border p-4 rounded shadow mt-4 text-center"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h1 className="m-1">{blog.title}</h1>
        <p className="m-2">Url: {blog.url}</p>
        <p className="m-2">Likes: {blog.likes}</p>
        <p className="m-2">Added by {blog.author.username}</p>

        <div className="mt-4">
          <Button onClick={handleIncrementLikes} className="m-2">
            Like
          </Button>
          {user.id === blog.author.id && (
            <Button onClick={handleDelete}>Delete</Button>
          )}
        </div>
        <div className="mt-4">
          <NewCommentForm blog={blog} />
          <h5 className="text-start m-2">Comments</h5>
          <ListGroup className="pt-2" variant="flush">
            {blog.comments.length > 0 ? (
              blog.comments.map((comment) => <ListGroup.Item>{comment}</ListGroup.Item>)
            ) : (
              <p>No comments yet</p>
            )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
