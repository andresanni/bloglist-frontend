import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const getById = async (id) =>{
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const createBlogPost = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlogPost = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const deleteBlogPost = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default {
  getAll,
  setToken,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getById
};
