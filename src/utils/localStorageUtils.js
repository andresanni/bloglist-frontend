import blogService from "../services/blogs";

const getUserFromStorage = () => {
  const loggedUser = window.localStorage.getItem("loggedUser");
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    return user;
  }
  return null;
};


const saveUserToStorage = (user)=>{
    localStorage.setItem("loggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
}

const removeUserFromStorage = ()=>{
  localStorage.removeItem("loggedUser");
  blogService.setToken(null);
}

export { getUserFromStorage, saveUserToStorage, removeUserFromStorage };
