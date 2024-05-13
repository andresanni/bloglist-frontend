import { useState } from 'react';

const Blog = ({ blog, handleIncrementLikes, handleDelete , user}) => {
  const [fullView, setFullView] = useState(false);

  const handleFullView = () => {
    setFullView(!fullView);
  };

  const blogFullViewStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    paddingTop:10,
    paddingLeft:2,
    marginBottom: 5
  };

  return (
    <div>
      {fullView ? (
        <div style={blogFullViewStyle}>
          <div>
            {blog.title}
            <button onClick={handleFullView}>hide</button>
          </div>
          <p>{blog.url}</p>
          <div>
            likes:{blog.likes}{' '}
            <button
              onClick={() => {
                handleIncrementLikes(blog);
              }}
            >
              like
            </button>
          </div>
          <div style={{display:"flex", flexDirection:"column",alignItems: "flex-start"}}>
          {blog.author.username}
          {
            (user.id === blog.author.id) && <button onClick={()=>{handleDelete(blog)}}>Delete</button>
          }          
          </div>
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={handleFullView}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
