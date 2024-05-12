import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken)=>{
token =`Bearer ${newToken}` ; 
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
  return response.data;
}

const createBlogPost = async(blog)=>{
 
  const config = {
    headers: {Authorization:token}
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export default { getAll , setToken, createBlogPost } 