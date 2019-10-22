import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @author      minz-logger
 * @date        2019. 09. 09
 * @description 토큰 생성
 */
export const generateToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (error, token) => {
			if (error) reject(error);

			resolve(token);
		});
	});
};

/**
 * @author      minz-logger
 * @date        2019. 09. 09
 * @description 토큰 해석
 */
function decodeToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (error, decode) => {
			if (error) reject(error);

			resolve(decode);
		});
	});
}

/**
 * @author      minz-logger
 * @date        2019. 09. 09
 * @description 토큰 미들웨어 (인증 여부 확인, 인증 정보 획득)
 */
export const jwtMiddleware = async (ctx, next) => {
	const token = ctx.cookies.get('access_token');

	if (!token) return next();

	try {
		const decoded = await decodeToken(token);

		if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
			const { _id, profile } = decoded;
			const refreshToken = await generateToken({ _id, profile }, 'account');
			ctx.cookies.set('access_token', refreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
		}

		ctx.request.user = decoded;
	} catch (e) {
		ctx.throw(500, e);
	}

	return next();
};
