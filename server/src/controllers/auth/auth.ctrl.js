import Account from 'models/account';
import Joi from 'joi';
import { getProfile } from 'lib/social';

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 로컬 회원가입
 */
export const localRegister = async (ctx) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(4).max(12).required(),
		username: Joi.string().min(2).required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - authCtrl > localReegister'
		});

		return;
	}

	try {
		let key = await Account.findByEmailOrUsername(ctx.request.body);
		if (key) {
			ctx.res.badRequest({
				data: {
					key: key.email === ctx.request.body.email ? 'email' : 'username'
				},
				message: `Duplicate ${key.email === ctx.request.body.email ? 'email' : 'username'}`
			});

			return;
		}

		let account = await Account.localRegister(ctx.request.body);
		ctx.res.ok({
			data: account.profile,
			message: 'Success - authCtrl > localRegister'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: e,
			message: `Error - authCtrl > localRegister: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 로컬 로그인
 */
export const localLogin = async (ctx) => {
	let { email, password } = ctx.request.body;

	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.res.badRequest({
			data: result.error,
			message: 'Fail - authCtrl > localLogin'
		});

		return;
	}

	try {
		let account = await Account.findByEmail(email);
		if (!account || !account.validatePassword(password)) {
			ctx.res.badRequest({
				data: email,
				message: 'Fail - authCtrl > localLogin'
			});

			return;
		}

		let token = await account.generateToken();
		ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });

		ctx.res.ok({
			data: {
				id: account._id,
				profile: account.profile,
				count: account.thoughCount
			},
			message: 'Success - authCtrl > localLogin'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: e,
			message: `Error - authCtrl > localLogin: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 로그아웃
 */
export const logout = (ctx) => {
	try {
		ctx.cookies.set('access_token', null, { httpOnly: true, maxAge: 0 });

		ctx.res.noContent({
			data: 'Remove access token',
			message: 'Success - authCtrl > logout'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: '',
			message: `Error - authCtrl > logout: ${e.message}`
		});
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 로그인 여부 확인
 */
export const check = (ctx) => {
	const { user } = ctx.request;

	if (!user) {
		ctx.res.noContent({
			data: user,
			message: 'Success - authCtrl > check'
		});

		return;
	}

	try {
		ctx.res.ok({
			data: {
				id: user._id,
				profile: user.profile,
				count: user.thoughCount
			},
			message: 'Success - authCtrl > check'
		});
	} catch (e) {
		ctx.res.internalServerError({
			data: '',
			message: `Error - authCtrl > check: ${e.message}`
		});
	}
};
/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 소셜 로그인
 */
export const socialLogin = async (ctx) => {
	const schema = Joi.object().keys({
		accessToken: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { provider } = ctx.params;
	const { accessToken } = ctx.request.body;

	let profile = null;
	try {
		profile = await getProfile(provider, accessToken);
	} catch (e) {
		ctx.throw(500, e);
	}

	if (!profile) {
		ctx.status = 403;
		return;
	}

	const { id, email } = profile;

	let user = null;
	try {
		user = await Account.findSocialId({ provider, id });
	} catch (e) {
		ctx.throw(500, e);
	}

	if (user) {
		const token = await user.generateToken();
		ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
		ctx.body = {
			id: user._id,
			profile: user.profile
		};

		return;
	}

	if (!user && profile.email) {
		let duplicated = null;
		try {
			duplicated = await Account.findByEmail(email);
		} catch (e) {
			ctx.throw(500, e);
		}

		if (duplicated) {
			duplicated.social[provider] = {
				id,
				accessToken
			};

			try {
				await duplicated.save();
			} catch (e) {
				e.throw(500, e);
			}
		}
	}

	if (!user) {
		ctx.status = 204;
	}
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 소셜 회원가입
 */
export const socialRegister = async (ctx) => {
	const schema = Joi.object().keys({
		username: Joi.string().regex(/^[a-zA-Z0-9가-힣]{2,12}$/).required(),
		accessToken: Joi.string().required()
	});

	const result = Joi.validate(ctx.request.body, schema);

	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { provider } = ctx.params;
	const { username, accessToken } = ctx.request.body;

	let profile = null;
	try {
		profile = await getProfile(provider, accessToken);
	} catch (e) {
		ctx.throw(500, e);
	}

	if (profile.email) {
		let exists = null;
		try {
			const { id, email } = profile;

			exists = await Account.findByEmailOrUsername({ email, username });

			if (exists) {
				ctx.status = 409;
				ctx.body = {
					key: exists.email === email ? 'email' : 'username'
				};
				return;
			}

			account = await Account.socialRegister({ email, username, provider, id, accessToken });
		} catch (e) {
			ctx.throw(500, e);
		}
	}

	let token = null;
	try {
		token = await account.generateToken();
	} catch (e) {
		ctx.throw(500, e);
	}

	ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
	ctx.body = {
		id: account._id,
		profile: account.profile
	};
};
