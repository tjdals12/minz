import { Schema, model } from 'mongoose';
import DEFINE from 'models/common';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 댓글 스키마
 */
const CommentSchema = Schema({
	content: String,
	postId: Schema.Types.ObjectId,
	writer: String,
	publishedDate: {
		type: Date,
		default: DEFINE.dateNow,
		get: DEFINE.dateConverter
	}
});

CommentSchema.set('toJSON', { getters: true });

export default model('Comment', CommentSchema);
