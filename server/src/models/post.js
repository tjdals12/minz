import { Schema, model } from 'mongoose';
import Account from 'models/account';

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
	comments: [ Schema.Types.ObjectId ],
	writer: String,
	publishedDate: {
		type: Date,
		default: () => Date.now()
	}
});

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

export default model('Post', PostSchema);
