import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Message from "./components/Message";
import UsersList from "./components/UsersList";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

const App = () => {


  return (
    <>
      <NavBar />
      <Message />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create" element={<NewBlogForm />} />
        <Route path="/list" element={<BlogsList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </>
  );
};

export default App;
