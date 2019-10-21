import Series from 'models/series';
import Post from 'models/post';
import Account from 'models/account';
import Joi from 'joi';

/**
 * @author 		minz-logger
 * @date 		2019. 10. 20
 * @description 시리즈 생성
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

	const userInfo = await Account.findByUsername(user.profile.username);
	const { username: writer } = userInfo.profile;

	let { thumbnail, name, keyword, description } = ctx.request.body;

	const schema = Joi.object().keys({
		thumbnail: Joi.string().optional(),
		name: Joi.string().required(),
		keyword: Joi.array().items(Joi.string()).required(),
		description: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - seriesCtrl > create'
		});

		return;
	}

	try {
		const series = await Series.createSeries({ thumbnail, name, keyword, description, writer });

		ctx.res.ok({
			data: series,
			message: 'Success - seriesCtrl > create'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: series,
			message: `Error - seriesCtrl > create: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 20
 * @description 시리즈 목록 조회
 */
export const list = async (ctx) => {
	let page = parseInt(ctx.query.page || 1, 10);

	if (page < 1) {
		ctx.res.badRequest({
			data: page,
			message: 'Fail - postCtrl > list'
		});

		return;
	}

	try {
		const series = await Series.find({ dispGb: '01' }).sort({ seq: -1 }).limit(5 * page).lean({ getters: true });

		const limitBodyLength = (s) => ({
			...s,
			description: s.description.length < 125 ? s.description : `${s.description.slice(0, 125)}...`
		});

		ctx.res.ok({
			data: series.map(limitBodyLength),
			message: 'Success - seriesCtrl > list'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: [],
			message: `Error - seriesCtrl > list: ${e.message}`
		});
	}
};

/**
 * @author minz-logger
 * @date 2019. 10. 21
 * @description 시리즈 조회
 */
export const read = async (ctx) => {
	let { seq } = ctx.params;

	if (!seq) {
		ctx.res.badRequest({
			data: { seq: seq },
			message: 'Fail - seriesCtrl > read'
		});

		return;
	}

	try {
		const series = await Series.findOne({ seq: seq })
			.populate({ path: 'post', options: { sort: { _id: -1 } } })
			.lean({ getters: true });

		ctx.res.ok({
			data: {
				...series,
				post: series.post.map(limitBodyLength)
			},
			message: 'Success - seriesCtrl > read'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { seq: seq },
			message: `Error - seriesCtrl > read: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 21
 * @description 시리즈에 포스트 작성
 */
export const write = async (ctx) => {
	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

	const userInfo = await Account.findByUsername(user.profile.username);
	const { id } = userInfo;
	const { username: writer } = userInfo.profile;

	let { seq } = ctx.params;
	let { title, body, tags } = ctx.request.body;

	const schema = Joi.object().keys({
		title: Joi.string().required(),
		body: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: { user, title, body, tags },
			message: result.error
		});

		return;
	}

	try {
		const post = await Series.writePost({ id, seq, writer, title, body, tags });

		ctx.res.ok({
			data: post,
			message: 'Success - seriesCtrl > write'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: ctx.request.body,
			message: `Error - seriesCtrl > write: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 21
 * @description 시리즈 수정
 */
export const update = async (ctx) => {
	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

	const userInfo = await Account.findByUsername(user.profile.username);
	const { username: writer } = userInfo.profile;

	let { seq } = ctx.params;
	let { thumbnail, name, description, keyword } = ctx.request.body;

	const schema = Joi.object().keys({
		thumbnail: Joi.string().optional(),
		name: Joi.string().required(),
		keyword: Joi.array().items(Joi.string()).required(),
		description: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - seriesCtrl > update'
		});

		return;
	}

	try {
		const series = await Series.updateSeries({ seq, thumbnail, name, description, keyword });

		ctx.res.ok({
			data: {
				...series,
				post: series.post
			}
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: ctx.request.body,
			message: `Error - seriesCtrl > update: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 21
 * @description 공개 / 비공개
 */
export const toggleDispGb = async (ctx) => {
	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

	const { seq } = ctx.params;

	if (!seq) {
		ctx.res.badRequest({
			data: { seq: seq },
			message: 'Fail - seriesCtrl > toggleDispGb'
		});

		return;
	}

	try {
		const series = await Series.toggleDispGb(seq);

		ctx.res.ok({
			data: {
				...series,
				post: series.post.map(limitBodyLength)
			},
			message: 'Success- - seriesCtrl > toggleDispGb'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { seq: seq },
			message: `Error - seriesCtrl > toggleDispGb: ${e.message}`
		});
	}
};

export const count = async (ctx) => {
	try {
		const count = await Series.find({ dispGb: '01' }).count().exec();

		ctx.body = count;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

const limitBodyLength = (post) => ({
	...post,
	title: post.title.length < 50 ? post.title : `${post.title.slice(0, 50)}...`,
	body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
	comments: post.comments.length
});
