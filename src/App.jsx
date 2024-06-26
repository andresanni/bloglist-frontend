import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Message from "./components/Message";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import BlogDetails from "./components/BlogDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid className="m-1 ms-0">
      <NavBar />
      <Message />
      <Container className="d-flex flex-column justify-content-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<NewBlogForm />} />
          <Route path="/list" element={<BlogsList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Container>
    </Container>
  );
};

export default App;
