import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ children, label }, ref) => {
  
    const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };
  
  const toggleVisibility = ()=>{
    setVisible(!visible);
  }

  useImperativeHandle(ref, ()=>{
    return {
        toggleVisibility
    }
  })
  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <button onClick= {toggleVisibility}>cancel</button>
      </div>
      
      <div style = {hideWhenVisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
    </div>
  );
});

export default Togglable;
