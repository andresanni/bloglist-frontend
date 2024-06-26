import { useState, useEffect } from "react";
import { useUpdateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";
import { Form, Button } from "react-bootstrap";

const NewCommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");
  const { isSuccess, isError, error, mutate } = useUpdateBlog();
  const { setNotification } = useNotification();

  useEffect(() => {
    if (isSuccess) {
      setComment("");
      setNotification("Comment added", "success");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      author: blog.author.id,
      comments: [...blog.comments, comment],
    };
    mutate(updatedBlog);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <Form.Control
        type="text"
        value={comment}
        onChange={handleChange}
        className="me-2"
        style={{ maxWidth: "400px", width: "100%" }}
      />
      <Button
        disabled={comment.length === 0}
        type="submit"
        style={{ maxWidth: "130px", width: "100%" }}
      >
        Add comment
      </Button>
    </Form>
  );
};

export default NewCommentForm;
