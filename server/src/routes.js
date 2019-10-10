import Router from 'koa-router';
import api from 'controllers';
import upload from 'upload';

const router = new Router();

router.use('/api', api.routes());
router.post('/upload', upload.single('imgUploader'), (ctx) => {
	let imgFile = ctx.req.file;
	ctx.body = imgFile.location;
});

export default router;
