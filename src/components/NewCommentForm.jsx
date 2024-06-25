import { useState, useEffect } from "react";
import { useUpdateBlog } from "../hooks/blogs";
import { useNotification } from "../context/NotificationContext";

const NewCommentForm = ( {blog} )=> {
    
    const [comment, setComment] = useState("");
    const { isSuccess, isError, error, mutate} = useUpdateBlog();
    const {setNotification} = useNotification();

    useEffect(()=>{
        if(isSuccess){
            setComment("");
            setNotification("Comment added", "success")
        }
    }, [isSuccess])
    const handleChange=(e)=>{
        setComment(e.target.value)
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        const updatedBlog = {
            ...blog,
            author: blog.author.id,
            comments : [...blog.comments , comment]
        }
        mutate(updatedBlog);                
        }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={ comment } onChange={ handleChange } />
            <button disabled={comment.length===0} type="submit">Add comment</button>
        </form>
    )
}

export default NewCommentForm;