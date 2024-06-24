import { useState } from "react";
import loginService from "../services/login";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      username
      <input
        data-testid="username"
        name="Username"
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      password
      <input
        data-testid="password"
        name="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
