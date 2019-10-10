import Router from 'koa-router';
import * as blogCtrl from './blog.ctrl';

const blog = new Router();

blog.get('/', blogCtrl.getInfo);
blog.patch('/', blogCtrl.edit);

export default blog;
