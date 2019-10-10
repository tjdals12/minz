import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl';

const comment = new Router();

comment.post('/', commentCtrl.checkObjectId, commentCtrl.writeComment);
comment.get('/', commentCtrl.commentList);
comment.get('/:id', commentCtrl.readComment);
comment.delete('/:id', commentCtrl.deleteComment);

export default comment;
