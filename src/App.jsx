import { useState, useEffect } from 'react';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Message from './components/Message';
import NewBlogForm from './components/NewBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setMessage('wrong credentials');
      setMessageType('error');
      
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };
  const handleAddBlog = async (blog) => {
    
    try{
      await blogService.createBlogPost(blog);
      setMessage("Blog added");
      setMessageType("success");
       setTimeout(() => {
         setMessage(null);
         setMessageType(null);
       }, 5000);
    }
    catch(exception){
      console.log(exception)
    }
  };


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };
  return (
    <div>
      <div>
        {message && <Message type={messageType} message={message} />}
      </div>

      <div>
        {user ? (
          <div>
            <p>{user.username} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            <NewBlogForm onSubmit={handleAddBlog} />
            <BlogsList blogs={blogs} />
          </div>
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
