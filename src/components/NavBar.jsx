import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { setNotification } = useNotification();

  const handleLogout = () => {
    logout();
    setNotification("Session closed", "success");
  };

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/create">Create</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/list">List</Link>
        <Link to="/users">Users</Link>
      </ul>
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default NavBar;
