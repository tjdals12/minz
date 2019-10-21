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
export const getPostForEdit = (id) => axios.get(`/api/posts/${id}/foredit`);
export const writePost = (param) => axios.post('/api/posts', { ...param });
export const editPost = (id, param) => axios.patch(`/api/posts/${id}`, { ...param });
export const deletePost = (id) => axios.delete(`/api/posts/${id}`);
export const getPrevPost = (id) => axios.get(`/api/posts/${id}/prev`);
export const getNextPost = (id) => axios.get(`/api/posts/${id}/next`);

/** Comment */
export const getComments = (id, page) => axios.get(`/api/comments/${id}/list?page=${page}`);
export const writeComment = (param) => axios.post('/api/comments', { ...param });
export const deleteComment = (id) => axios.delete(`/api/comments/${id}`);

/** Series */
export const getSeriesList = (page) => axios.get(`/api/series?page=${page}`);
export const createSeries = (param) => axios.post('/api/series', { ...param });
export const getSeries = (seq) => axios.get(`/api/series/${seq}`);
export const writePostInSeries = (seq, param) => axios.post(`/api/series/${seq}`, { ...param });
export const updateSeries = (seq, param) => axios.patch(`/api/series/${seq}`, { ...param });
export const toggleDispGb = (seq) => axios.patch(`/api/series/${seq}/toggle`);
