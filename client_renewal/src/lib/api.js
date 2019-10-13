import axios from 'axios';

/** Auth */
export const localRegister = (param) => axios.post('/api/auth/register/local', { ...param });

/** Blog */
export const getBlog = () => axios.get('/api/blogs');
