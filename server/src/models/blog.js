import { Schema, model } from 'mongoose';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 블로그 정보 스키마
 */
const BlogSchema = new Schema({
	user: String,
	background: String,
	thumbnail: String,
	title: String,
	name: String,
	description: String,
	info: String,
	tags: [ String ]
});

/**
 * @author 		minz-logger
 * @date 		2019. 10. 25
 * @description 블로그 정보 생성
 * @params 		{Object} params
 */

BlogSchema.statics.saveBlog = function(params) {
	let { user, background, thumbnail, title, name, description, info, tags } = params;

	const blog = new this({ user, background, thumbnail, title, name, description, info, tags });

	return blog.save();
};

export default model('Blog', BlogSchema);
