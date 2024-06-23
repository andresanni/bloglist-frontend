import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Message from "./components/Message";
import { useAuth } from "./context/AuthContext";
import { useNotification } from "./context/NotificationContext";

const App = () => {
  const { user, logout } = useAuth();
  const { setNotification } = useNotification();

  const handleLogout = () => {
    logout();
    setNotification("Session closed", "success");
  };
  return (
    <div>
      <div>
        <Message />
      </div>

      <div>
        {user ? (
          <div>
            <p>{user.username} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            <NewBlogForm />
            <BlogsList user={user} />
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default App;
