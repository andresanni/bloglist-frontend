import { useState } from "react";

const Blog = ({blog})=>{

const [fullView, setFullView] = useState(false);

const handleFullView = ()=>{
  setFullView(!fullView);
}

const blogFullViewStyle = {
  display: "flex",
  flexDirection:"column",
  border: "1px solid black"
}

return(

  <div>
    {
      fullView ?
      (
      <div style={blogFullViewStyle}>
        <div>
        {blog.title} 
        <button onClick = {handleFullView}>hide</button> 
        </div>
        <p>{blog.url}</p>
        <div>
        likes:{blog.likes} <button>like</button>
        </div>
        {blog.author.username}      
      </div>
      )
      :
      (
      <div>
        {blog.title} 
        <button onClick={handleFullView}>view</button>
      </div>
      )

    }
  </div>  
)
};


export default Blog