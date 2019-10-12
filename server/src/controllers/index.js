import Router from 'koa-router';
import post from './post';
import comment from './comment';
import series from './series';
import auth from './auth';
import blog from './blog';

const api = new Router();

api.use('/posts', post.routes());
api.use('/comments', comment.routes());
api.use('/series', series.routes());
api.use('/auth', auth.routes());
api.use('/blogs', blog.routes());

export default api;
