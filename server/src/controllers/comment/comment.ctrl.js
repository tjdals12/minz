import Comment from 'models/comment';
import Joi from 'joi';
import { Types } from 'mongoose';

const Post = require('../../models/post');

export const checkObjectId = (ctx, next) => {
	const { postId } = ctx.request.body;

	if (!postId) {
		ctx.status = 404;
		return null;
	}

	if (!Types.ObjectId.isValid(postId)) {
		ctx.status = 400;
		return null;
	}

	return next();
};

export const writeComment = async (ctx) => {
	const { content, postId } = ctx.request.body;

	const user = ctx.request.user;

	if (!user) {
		ctx.status = 400;
		return;
	}

	const { username: writer } = user.profile;

	const schema = Joi.object().keys({
		content: Joi.string().required(),
		postId: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const comment = new Comment({ writer, content, postId });

	try {
		const { id } = await comment.save();

		await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: id } });

		ctx.body = comment;
	} catch (e) {
		ctx.throw(ctx, 500);
	}
};

export const commentList = async (ctx) => {
	const page = parseInt(ctx.query.page || 1, 10);
	const { id } = ctx.query;

	try {
		const comments = await Comment.find({ postId: id }).sort({ _id: -1 }).skip((page - 1) * 5).limit(5).exec();
		const commentCount = await Comment.count({ postId: id }).exec();

		ctx.set('Comment-Count', Math.ceil(commentCount));
		ctx.set('Last-Page', Math.ceil(commentCount / 5));
		ctx.body = comments;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const readComment = async (ctx) => {
	const { id } = ctx.params;

	try {
		const comment = await Comment.findById(id).exec();

		ctx.body = comment;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const deleteComment = async (ctx) => {
	const { id } = ctx.params;
	const postId = ctx.query.postId;

	try {
		await Comment.findByIdAndRemove(id).exec();

		const post = await Post.findByIdAndUpdate(
			postId,
			{ $pull: { comments: id } },
			{
				new: true
			}
		);

		ctx.body = post;
	} catch (e) {
		ctx.throw(e, 500);
	}
};
