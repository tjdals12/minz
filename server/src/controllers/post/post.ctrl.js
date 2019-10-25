import Post from 'models/post';
import Series from 'models/series';
import Comment from 'models/comment';
import Account from 'models/account';
import Joi from 'joi';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 작성
 */
export const write = async (ctx) => {
	const { title, body, tags } = ctx.request.body;

	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
	}

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
		const post = await Post.savePost({ username: user.profile.username, title, body, tags });

		ctx.res.ok({
			data: post,
			message: 'Success - postCtrl > write'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: e,
			message: `Error - postCtrl > write: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 목록 조회
 */
export const list = async (ctx) => {
	const page = parseInt(ctx.query.page || 1, 10);
	const { tag } = ctx.query;

	const query = tag
		? {
				tags: tag // tags 배열에 tag를 가진 포스트 찾기
			}
		: {};

	if (page < 1) {
		ctx.res.badRequest({
			data: { page: page },
			message: 'Fail - postCtrl > list'
		});

		return;
	}

	try {
		const posts = await Post.find(query).sort({ _id: -1 }).limit(5 * page).lean();

		const postCount = await Post.countDocuments(query);

		const limitBodyLength = (post) => ({
			...post,
			title: post.title.length < 50 ? post.title : `${post.title.slice(0, 50)}...`,
			body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
			comments: post.comments.length
		});

		ctx.set('Last-Page', Math.ceil(postCount / 5));

		ctx.res.ok({
			data: posts.map(limitBodyLength),
			message: 'Success - postCtrl > list'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: [],
			message: `Error - postCtrl > list: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 카운트
 */
export const count = async (ctx) => {
	try {
		const count = await Post.find({ dispGb: true }).countDocuments();
		const todayCount = await Post.find({
			publishedDate: { $gte: new Date().setHours(0, 0, 0, 0) }
		}).countDocuments();

		ctx.res.ok({
			data: {
				count,
				todayCount
			},
			message: 'Success - postCtrl > list'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: null,
			message: 'Error - postCtrl > list'
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 조회
 */
export const read = async (ctx) => {
	const { id } = ctx.params;

	try {
		const post = await Post.findByIdAndUpdate(
			id,
			{ $inc: { hit: 1 } },
			{
				new: true
			}
		).populate({ path: 'comments', options: { sort: { publishedDate: -1 }, limit: 5 } });

		const commentCount = await Comment.countDocuments({ postId: id });

		if (!post) {
			ctx.res.notFound({
				data: { id: id },
				message: 'Fail - postCtrl > read'
			});
			return;
		}

		ctx.set('Comment-Count', Math.ceil(commentCount));
		ctx.set('Last-Page', Math.ceil(commentCount / 5));

		ctx.res.ok({
			data: post,
			message: 'Success - postCtrl > read'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			message: `Error - postCtrl > read: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 10. 20
 * @description 포스트 조회 for edit
 */
export const readForEdit = async (ctx) => {
	const { id } = ctx.params;

	try {
		const post = await Post.findById(id, { title: 1, body: 1, tags: 1 });

		ctx.res.ok({
			data: post,
			message: 'Success - postCtrl > readForEdit'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			message: `Error - postCtrl > readForEdit: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 수정
 */
export const update = async (ctx) => {
	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'Fail - postCtrl > update'
		});

		return;
	}

	let { id } = ctx.params;
	let { title, body, tags } = ctx.request.body;

	let schema = Joi.object().keys({
		title: Joi.string().required(),
		body: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).optional()
	});

	let result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - postCtrl > update'
		});

		return;
	}

	try {
		const { username: writer } = user.profile;
		const post = await Post.findOneAndUpdate(
			{
				$and: [ { _id: id }, { writer: writer } ]
			},
			{
				$set: {
					title,
					body,
					tags
				}
			},
			{
				new: true
			}
		);

		if (!post) {
			ctx.res.notFound({
				data: {},
				message: 'Fail - postCtrl > update'
			});
			return;
		}

		ctx.res.ok({
			data: post,
			message: 'Success - postCtrl > update'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			messagee: `Error - postCtrl > update: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 삭제
 */
export const deletePost = async (ctx) => {
	const { id } = ctx.params;

	const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'Fail - postCtrl > deletePost'
		});
		return;
	}

	try {
		const { series } = await Post.findById(id);
		const { username: writer } = user.profile;
		const result = await Account.findOne({ 'profile.username': writer, myposts: id });

		if (!result) {
			ctx.res.forbidden({
				data: { writer: writer },
				message: 'Fail - postCtrl > deletePost'
			});
			return;
		}

		await Series.findOneAndUpdate({ seq: series.seq }, { $pull: { post: id } }, { new: true });
		await Post.findByIdAndDelete(id);
		await Comment.deleteMany({ postId: id });

		const { id: userId } = result;
		await Account.findByIdAndUpdate(userId, { $pull: { myposts: id } });

		ctx.res.noContent({
			data: {},
			message: 'Success - postCtrl > deletePost'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			message: `Error - postCtrl > deletePost: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 이전 포스트
 */
export const prev = async (ctx) => {
	const { id } = ctx.params;

	try {
		const prevPost = await Post.find({ _id: { $lt: id } }, { title: 1, publishedDate: 1 })
			.sort({ _id: -1 })
			.limit(1);

		ctx.res.ok({
			data: prevPost[0],
			message: 'Success - postCtrl > prev'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			message: `Error - postCtrl > prev: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 다음 포스트
 */
export const next = async (ctx) => {
	const { id } = ctx.params;

	try {
		const nextPost = await Post.find({ _id: { $gt: id } }, { title: 1, publishedDate: 1 })
			.sort({ _id: -1 })
			.limit(1);

		ctx.res.ok({
			data: nextPost[0],
			message: 'Success - postCtrl > next'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { id: id },
			message: `Error - postCtrl > next: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 포스트 검색
 */
export const search = async (ctx) => {
	const page = parseInt(ctx.query.page || 1, 10);

	if (page < 1) {
		ctx.res.badRequest({
			data: { page: page },
			message: 'Fail - postCtrl > list'
		});

		return;
	}

	const { keyword } = ctx.request.body;

	try {
		const searchResult = await Post.find({
			$or: [ { title: { $regex: `${keyword}.*`, $options: 'i' } }, { tags: { $in: keyword } } ]
		})
			.sort({ _id: -1 })
			.limit(5 * page)
			.lean();

		const postCount = await Post.countDocuments({
			$or: [ { title: { $regex: `${keyword}.*`, $options: 'i' } }, { tags: { $in: keyword } } ]
		});

		const limitBodyLength = (post) => ({
			...post,
			title: post.title.length < 50 ? post.title : `${post.title.slice(0, 50)}...`,
			body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
			comments: post.comments.length
		});

		ctx.set('Last-Page', Math.ceil(postCount / 5));

		ctx.res.ok({
			data: {
				searchPosts: searchResult.map(limitBodyLength),
				count: postCount
			}
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { keyword: keyword },
			message: `Error - postCtrl > search: ${e.message}`
		});
	}
};
