import { useState, useEffect } from "react";
import { useCreateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";

const NewBlogForm = () => {
  const [blog, setBlog] = useState({ url: "", title: "" });
  const {
    mutate: createBlog,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useCreateBlog();

  const { setNotification } = useNotification();

  useEffect(()=>{
    if (isError) {
      setNotification(error.response.data.error,"error");
       }
    if(isSuccess){
      setNotification("Blogpost Saved")
    }
  },[isError, error, isSuccess])

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog({ url: "", title: "" });   
    
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  

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
