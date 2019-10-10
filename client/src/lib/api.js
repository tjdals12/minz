import axios from 'axios';
import queryString from 'query-string';

/** POST */
export const writePost = ({ title, body, tags }) => axios.post(`/api/post`, { title, body, tags });
export const editPost = ({ postId, title, body, tags }) => axios.patch(`/api/post/${postId}`, { title, body, tags });
export const getPost = (id) => axios.get(`/api/post/${id}`);
export const getPrevPost = (id) => axios.get(`/api/post/prev/${id}`);
export const getNextPost = (id) => axios.get(`/api/post/next/${id}`);
export const getPostCount = () => axios.get(`/api/post/count`);
export const deletePost = (id) => axios.delete(`/api/post/${id}`);
export const getPostList = ({ tag, page }) => axios.get(`/api/post?${queryString.stringify({ tag, page })}`);
export const getSearchList = (keyword) => axios.post(`/api/post/search`, { keyword });

/** Comment */
export const writeComment = ({ content, postId }) => axios.post(`/api/comment`, { content, postId });
export const deleteComment = ({ target, id }) => axios.delete(`/api/comment/${target}?postId=${id}`);
export const getCommentList = ({ id, page }) => axios.get(`/api/comment?${queryString.stringify({ id, page })}`);

/** Series */
export const createSeries = ({ thumb, name, description, keyword }) =>
	axios.post(`/api/series`, { thumb, name, description, keyword });
export const updateSeries = ({ series, thumb, name, description, keyword }) =>
	axios.patch(`/api/series/${series}`, { thumb, name, description, keyword });
export const toggleSeries = ({ seq, dispGb }) => axios.patch(`/api/series/toggle/${seq}`, { dispGb });
export const writeInSeries = ({ series, title, body, tags }) =>
	axios.post(`/api/series/${series}`, { title, body, tags });
export const getSeriesList = ({ page }) => axios.get(`/api/series?${queryString.stringify({ page })}`);
export const getSeries = (seq) => axios.get(`/api/series/${seq}`);
export const getSeriesCount = () => axios.get(`/api/series/count`);

/** Auth */
export const registerLocal = ({ email, password, username }) =>
	axios.post(`/api/auth/register/local`, { email, password, username });
export const loginLocal = (email, password) => axios.post(`/api/auth/login/local`, { email, password });
export const logout = () => axios.post(`/api/auth/logout`);
export const loginCheck = () => axios.get(`/api/auth/check`);
export const loginSocial = ({ provider, accessToken }) =>
	axios.post(`/api/auth/login/${provider}/social`, { accessToken });
export const registerSocial = ({ provider, username, accessToken }) =>
	axios.post(`/api/auth/register/${provider}/social`, { username, accessToken });

/** Blog */
export const getBlogInfo = () => axios.get(`/api/blog`);
export const editBlogInfo = ({ background, thumbnail, title, name, description, info, tags }) =>
	axios.patch(`/api/blog`, { background, thumbnail, title, name, description, info, tags });
