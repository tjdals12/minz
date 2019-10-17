import axios from 'axios';

/** Auth */
export const localRegister = (param) => axios.post('/api/auth/register/local', { ...param });

/** Blog */
export const getBlog = () => axios.get('/api/blogs');

/** Post */
export const getPosts = (page) => axios.get(`/api/posts?page=${page}`);
export const getPost = (id) => axios.get(`/api/posts/${id}`);
