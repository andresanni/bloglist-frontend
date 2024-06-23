import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "RESET_NOTIFICATION":
      return { message: "", type: "" };
    default:
      return state;
  }
};

const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: "",
    type: "",
  });

  const setNotification = (message, type, timeout = 5000) => {
    dispatch({ type: "SET_NOTIFICATION", payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: "RESET_NOTIFICATION" });
    }, timeout);
  }; 

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { useNotification, NotificationProvider };
