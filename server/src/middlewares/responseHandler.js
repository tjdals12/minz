import statusCodes from 'constants/statusCodes';

const responseHandler = () => {
	return async (ctx, next) => {
		ctx.res.statusCodes = statusCodes;
		ctx.statusCodes = ctx.res.statusCodes;

		ctx.res.success = ({ statusCode, data = null, message = null }) => {
			const status = 'success';

			if (!!statusCode || statusCode < 400) {
				ctx.status = statusCodes.OK;
			} else if (!(statusCode < 400)) {
				ctx.status = statusCodes.OK;
			}

			ctx.body = {
				status,
				data,
				message
			};
		};

		ctx.res.fail = ({ statusCode, data = null, message = null }) => {
			const status = 'fail';

			if (!!statusCode && (statusCode >= 400 && statusCode < 500)) {
				ctx.status = statusCodes.BAD_REQUEST;
			} else if (!(statusCode >= 400 && statusCode < 500)) {
				ctx.status = statusCodes.BAD_REQUEST;
			}

			ctx.body = {
				status,
				data,
				message
			};
		};

		ctx.res.error = ({ statusCode, data = null, message = null }) => {
			const status = 'error';

			if (!!statusCode && statusCode >= 500) {
				ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
			} else if (!(statusCode >= 500)) {
				ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
			}

			ctx.body = {
				status,
				data,
				message
			};
		};

		ctx.res.ok = (params = {}) => {
			ctx.res.success({
				statusCode: statusCodes.OK,
				...params
			});
		};

		ctx.res.noContent = (params = {}) => {
			ctx.res.success({
				statusCode: statusCodes.NO_CONTENT,
				...params
			});
		};

		ctx.res.badRequest = (params = {}) => {
			ctx.res.fail({
				statusCode: statusCodes.BAD_REQUEST,
				...params
			});
		};

		ctx.res.unauthorized = (params = {}) => {
			ctx.res.fail({
				statusCode: statusCodes.UNAUTHORIZED,
				...params
			});
		};

		ctx.res.forbidden = (params = {}) => {
			ctx.res.fail({
				statusCode: statusCodes.FORBIDDEN,
				...params
			});
		};

		ctx.res.notFound = (params = {}) => {
			ctx.res.fail({
				statusCode: statusCodes.NOT_FOUND,
				...params
			});
		};

		ctx.res.internalServerError = (params = {}) => {
			ctx.res.error({
				statusCode: statusCodes.INTERNAL_SERVER_ERROR,
				...params
			});
		};

		await next();
	};
};

export default responseHandler;
