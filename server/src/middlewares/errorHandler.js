import { UNKNOWN_ENDPOINT, UNKNOWN_ERROR } from 'constants/error';
import Response from 'utils/response';

const errorHandler = () => {
	return async (ctx, next) => {
		try {
			await next();

			if (!ctx.body && (!ctx.status || ctx.status === 404)) {
				return Response.badRequest(ctx, UNKNOWN_ENDPOINT);
			}
		} catch (e) {
			console.log(e.message);
			return Response.internalServerError(ctx, UNKNOWN_ERROR);
		}
	};
};

export default errorHandler;
