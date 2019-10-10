import { Types } from 'mongoose';

export const checkObjectId = async (ctx, next) => {
	const { id } = ctx.params;

	if (!Types.ObjectId.isValid(id)) {
		ctx.res.badRequest({
			data: id,
			message: 'Fail - Type error (id)'
		});

		return;
	}

	return next();
};
