import { Schema, model } from 'mongoose';
import Account from 'models/account';
import DEFINE from 'models/common';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 스키마
 */
const PostSchema = new Schema({
	thumbnail: {
		type: String,
		default: 'https://ih0.redbubble.net/image.523773899.2261/flat,550x550,075,f.u4.jpg'
	},
	title: String,
	body: String,
	tags: [ String ],
	hit: {
		type: Number,
		default: 0
	},
	like: {
		type: Number,
		default: 0
	},
	dispGb: {
		type: Boolean,
		default: true
	},
	category: Schema.Types.ObjectId,
	series: {
		seq: {
			type: Number,
			default: 9999
		},
		subSeq: {
			type: Number,
			default: 1
		}
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	writer: String,
	publishedDate: {
		type: Date,
		default: DEFINE.dateNow,
		get: DEFINE.dateConverter
	}
});

PostSchema.set('toJSON', { getters: true });

/**
 * @author      minz-logger
 * @date        2019. 09. 09
 * @description 포스트 작성
 * @param       {Object} params
 */
PostSchema.statics.savePost = async function(params) {
	let { username, title, body, tags } = params;

	const userInfo = await Account.findByUsername(username);
	const Post = new this({ writer: userInfo.profile.username, title, body, tags });

	await Post.save();
	await Account.findByIdAndUpdate(
		{ _id: userInfo._id },
		{
			$push: {
				myposts: Post._id
			},
			$inc: {
				throghCount: 1
			}
		}
	);

	return Post;
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 13
 * @description 오늘의 글
 */
PostSchema.statics.todayPostCount = async function() {
	const today = DEFINE.dateNow().format('YYYY-MM-DD');

	return this.find({}, { publishedDate: 1 }).then((data) => {
		data = data.filter((item) => item.publishedDate.substr(0, 10) === today);

		return data.length;
	});
};

export default model('Post', PostSchema);
