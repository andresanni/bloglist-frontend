const Message = ({ type, message }) => {
   console.log({type, message}) 
  const className = type ==="error" ? "error": "success";
  return <p className={className}>{message}</p>;
};

export default Message;