import axios from 'axios';

export const getBlog = () => axios.get('/api/blogs');
