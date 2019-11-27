import Router from 'koa-router';
import post from './post';
import comment from './comment';
import series from './series';
import auth from './auth';
import blog from './blog';
import link from './link';
import upload from '../upload';

const api = new Router();

api.post('/upload', upload.single('imgUploader'), (ctx) => {
	let imgFile = ctx.req.file;
	ctx.body = imgFile.location;
});
api.use('/posts', post.routes());
api.use('/comments', comment.routes());
api.use('/series', series.routes());
api.use('/auth', auth.routes());
api.use('/blogs', blog.routes());
api.use('/links', link.routes());

export default api;
