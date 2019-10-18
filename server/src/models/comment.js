import { Schema, model } from 'mongoose';
import DEFINE from 'models/common';

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
