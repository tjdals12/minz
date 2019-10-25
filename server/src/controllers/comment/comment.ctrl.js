import Comment from 'models/comment';
import Post from 'models/post';
import Joi from 'joi';
import { Types } from 'mongoose';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description ObjectId 검사
 */
export const checkObjectId = (ctx, next) => {
	const { postId } = ctx.request.body;

	if (!postId) {
		ctx.res.notFound({
			data: postId,
			message: 'Fail - postid required'
		});
		return null;
	}

	if (!Types.ObjectId.isValid(postId)) {
		ctx.res.badRequest({
			data: postId,
			message: 'Fail - Type error (id)'
		});
		return null;
	}

	return next();
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 댓글 작성
 */
export const writeComment = async (ctx) => {
	const { postId, content } = ctx.request.body;

	const user = ctx.request.user;

	if (!user) {
		ctx.res.badRequest({
			data: user,
			message: 'Fail - commentCtrl > writeComment'
		});
		return;
	}

	const { username: writer } = user.profile;

	const schema = Joi.object().keys({
		content: Joi.string().required(),
		postId: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - commentCtrl > writeComment'
		});

		return;
	}

	const comment = new Comment({ writer, content, postId });

	try {
		const { id } = await comment.save();

		await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: id } });

		ctx.res.ok({
			data: comment,
			message: 'Success - commentCtrl > writeComment'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: { postId, content },
			message: `Error - commentCtrl > writeComment: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 댓글 목록 조회
 */
export const commentList = async (ctx) => {
	const page = parseInt(ctx.query.page || 1, 10);
	const { postId } = ctx.params;

	try {
		const comments = await Comment.find({ postId: postId })
			.sort({ publishedDate: -1 })
			.skip((page - 1) * 5)
			.limit(5);

		const commentCount = await Comment.countDocuments({ postId: postId });

		ctx.set('Comment-Count', Math.ceil(commentCount));
		ctx.set('Last-Page', Math.ceil(commentCount / 5));

		ctx.res.ok({
			data: comments,
			message: 'Success - commentCtrl > commentList'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: comments,
			message: `Error - commentCtrl > commentList: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 댓글 조회
 */
export const readComment = async (ctx) => {
	const { id } = ctx.params;

	try {
		const comment = await Comment.findById(id);

		ctx.res.ok({
			data: comment,
			message: 'Success - commentCtrl > readComment'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: id,
			message: `Error - commentCtrl > readComment: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 댓글 삭제
 */
export const deleteComment = async (ctx) => {
	const { id } = ctx.params;
	const postId = ctx.query.postId;

	try {
		await Comment.findByIdAndRemove(id);

		const post = await Post.findByIdAndUpdate(
			postId,
			{ $pull: { comments: id } },
			{
				new: true
			}
		);

		ctx.res.ok({
			data: post,
			message: 'Success - commentCtrl > deleteComment'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: post,
			message: `Error - commentCtrl > deleteComment`
		});
	}
};
