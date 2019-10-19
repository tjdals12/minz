import path from 'path';
import multer from 'koa-multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

AWS.config.loadFromPath(__dirname + '/configs/awsconfig.json');
const s3 = new AWS.S3();

const storageS3 = multerS3({
	s3: s3,
	bucket: 'minz-log-image',
	key: function(req, file, cb) {
		let extension = path.extname(file.originalname);
		cb(null, Date.now().toString() + extension);
	}
});

export default multer({ storage: storageS3 });
