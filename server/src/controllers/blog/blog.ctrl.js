import Blog from 'models/blog';
import Post from 'models/post';
import Series from 'models/series';
import Joi from 'joi';

/**
 * @author 		minz-logger
 * @date 		2019. 10. 25
 * @description 블로그 정보 생성
 */
export const create = async (ctx) => {
	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

	let { background, thumbnail, title, name, description, info, tags } = ctx.request.body;

	const schema = Joi.object().keys({
		background: Joi.string().required(),
		thumbnail: Joi.string().required(),
		title: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string().required(),
		info: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - blogCtrl > write'
		});

		return;
	}

	try {
		const blog = await Blog.saveBlog({
			user: user.profile.username,
			background,
			thumbnail,
			title,
			name,
			description,
			info,
			tags
		});

		ctx.res.ok({
			data: blog,
			message: 'Success - blogCtrl > write'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: ctx.request.body,
			message: `Error - blogCtrl > write: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 22
 * @description 블로그 정보 조회
 */
export const getInfo = async (ctx) => {
	const user = 'Minz-logger';

	try {
		const { background, thumbnail, title, name, description, info, tags } = await Blog.findOne({ user: user });
		const postCount = await Post.countDocuments();
		const todayPostCount = await Post.todayPostCount();
		const seriesCount = await Series.countDocuments();

		ctx.res.ok({
			data: {
				background,
				thumbnail,
				title,
				name,
				description,
				info,
				tags,
				postCount,
				todayPostCount,
				seriesCount
			},
			message: 'Success'
		});
	} catch (e) {
		ctx.res.internalServerError({
			message: `Error - blogCtrl > getInfo: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 22
 * @description 블로그 정보 수정
 */
export const edit = async (ctx) => {
	const { user } = ctx.request;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

	let { background, title, thumbnail, name, description, info, tags } = ctx.request.body;

	const schema = Joi.object().keys({
		background: Joi.string().allow('').optional(),
		title: Joi.string().required(),
		thumbnail: Joi.string().allow('').optional(),
		name: Joi.string().required(),
		description: Joi.string().required(),
		info: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - blogCtrl > edit'
		});

		return;
	}

	let data = {};

	if (background) {
		data.background = background;
	}

	if (thumbnail) {
		data.thumbnail = thumbnail;
	}

	data = {
		...data,
		title,
		name,
		description,
		info,
		tags
	};

	try {
		const result = await Blog.findOneAndUpdate({ user: user.profile.username }, data, {
			new: true
		});

		ctx.res.ok({
			data: result,
			message: 'Success - blogCtrl > edit'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: ctx.request.body,
			message: `Error -  blogCtrl > edit: ${e.message}`
		});
	}
};
