import { createContext, useContext, useReducer, useEffect } from "react";
import {
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from "../utils/localStorageUtils";

const AuthContext = createContext();

const initialState = {
  id:"",
  token:"",
  username:"",
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: initialState };
    default:
      return state;
  }
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};



const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: initialState });

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  const login = (user) => {
    saveUserToStorage(user);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    removeUserFromStorage();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
