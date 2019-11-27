import { model, Schema } from 'mongoose';
import DEFINE from 'models/common';

/**
 * @author      minz-logger
 * @date        2019. 11. 27
 * @description 링크 스키마
 */
const LinkSchema = new Schema({
    title: String,
    to: String,
    publishedDate: {
		type: Date,
		default: DEFINE.dateNow,
		get: DEFINE.dateConverter
	}
});

LinkSchema.set('toJSON', { getters: true });

/**
 * @author 		minz-logger
 * @date 		2019. 11. 27
 * @description 링크 추가
 */
LinkSchema.statics.saveLink = function (params) {
	let {
		title,
		to
	} = params;

	const link = new this({ title, to });

	return link.save();
}

export default model('Link', LinkSchema);