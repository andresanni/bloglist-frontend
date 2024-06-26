import { useState, useEffect } from "react";
import { useCreateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";
import { Button, Form } from "react-bootstrap";

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

  useEffect(() => {
    if (isError) {
      setNotification(error.response.data.error, "error");
    }
    if (isSuccess) {
      setNotification("Blogpost Saved");
    }
  }, [isError, error, isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog({ url: "", title: "" });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mt-4">New Blogpost</h2>
      <Form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow mt-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(event) =>
              setBlog({ ...blog, title: event.target.value })
            }
            value={blog.title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            onChange={(event) => setBlog({ ...blog, url: event.target.value })}
            value={blog.url}
          />
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
