import { useState, useEffect, useRef } from 'react';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Message from './components/Message';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';

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
    try {
      newBlogRef.current.toggleVisibility();
      await blogService.createBlogPost(blog);
      setMessage('Blog added');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  const handleIncrementLikes = async(blog)=>{
    try{
      const updatedBlog = {
        title: blog.title,
        author: blog.author.id,
        url: blog.url,
        likes : blog.likes + 1
      }
      await blogService.updateBlogPost(blog.id,updatedBlog);    
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs);
    }
    catch(exception){
      console.log(exception);
    }
    
  }
  const newBlogRef = useRef();

  return (
    <div>
      <div>{message && <Message type={messageType} message={message} />}</div>

      <div>
        {user ? (
          <div>
            <p>{user.username} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            <Togglable label="wirte a blogpost" ref = {newBlogRef}>
              <NewBlogForm onSubmit={handleAddBlog} />
            </Togglable>
            <BlogsList blogs={blogs} handleIncrementLikes = {handleIncrementLikes}/>
          </div>
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
