import { useState } from "react";
import loginService from "../services/login";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      login(user);
      setUsername("");
      setPassword("");
      setNotification("Welcome!", "success");
      navigate("/");
    } catch (exception) {
      setNotification(exception.response.data.error, "error");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" >
      <Form onSubmit={handleSubmit} className="border p-4 rounded shadow mt-5" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
