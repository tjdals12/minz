import axios from 'axios';

/** Auth */
export const localRegister = (param) => axios.post('/api/auth/register/local', { ...param });
export const localLogin = (param) => axios.post('/api/auth/login/local', { ...param });
export const checkLogin = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');

/** Blog */
export const getBlog = () => axios.get('/api/blogs');

/** Post */
export const getPosts = (page) => axios.get(`/api/posts?page=${page}`);
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const deletePost = (id) => axios.delete(`/api/posts/${id}`);
export const getPrevPost = (id) => axios.get(`/api/posts/${id}/prev`);
export const getNextPost = (id) => axios.get(`/api/posts/${id}/next`);

/** Comment */
export const getComments = (id, page) => axios.get(`/api/comments/${id}/list?page=${page}`);
export const writeComment = (param) => axios.post('/api/comments', { ...param });
export const deleteComment = (id) => axios.delete(`/api/comments/${id}`);
