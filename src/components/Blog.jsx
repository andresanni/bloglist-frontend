import { useState } from "react";
import { useDeleteBlog, useUpdateBlog } from "../hooks/blogs";

const Blog = ({ blog, user }) => {

  const [fullView, setFullView] = useState(false);
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

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
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleFullView = () => {
    setFullView(!fullView);
  };
  


  const blogFullViewStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  return (
    <div data-testid="blogpost">
      {fullView ? (
        <div style={blogFullViewStyle}>
          <div>
            <p className="blog-title">{blog.title}</p>
            <button onClick={handleFullView}>hide</button>
          </div>
          <p>{blog.url}</p>
          <div>
            likes:<span data-testid="likes">{blog.likes}</span>{" "}
            <button onClick={handleIncrementLikes}>like</button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p>{blog.author.username}</p>
            {user.id === blog.author.id && (
              <button
                onClick={() => {
                  handleDelete(blog);
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>{blog.title}</p>
          <p>{blog.author.username}</p>
          <button onClick={handleFullView}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
