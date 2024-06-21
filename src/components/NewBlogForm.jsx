import { useState } from "react";
import { useCreateBlog } from "../hooks/blogs";


const NewBlogForm = () => {
  const [blog, setBlog] = useState({ url: "", title: "" });
  const {mutate: createBlog, isLoading, isError, error, isSuccess} = useCreateBlog();


  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog({ url: "", title: "" });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title:
        <input
          name="Title"
          onChange={(event) => setBlog({ ...blog, title: event.target.value })}
          value={blog.title}
          data-testid="title-input"
        />
        url:
        <input
          name="Url"
          onChange={(event) => setBlog({ ...blog, url: event.target.value })}
          value={blog.url}
          data-testid="url-input"
        />
        <button>create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
