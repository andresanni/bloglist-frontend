import {useNotification} from '../context/NotificationContext'

const Message = () => {
  const {state:notification} = useNotification(); 
  
  return <p>{notification.message}</p>;
};

export default Message;