import config from 'configs';
const { dbUri, dbUser, dbPass } = config;

import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description DB 연결
 */
export const connect = () => {
	return new Promise((resolve, reject) => {
		mongoose.Promise = global.Promise;

		if (process.env.NODE_ENV === 'development') {
			const mockgoose = new Mockgoose(mongoose);

			mockgoose.prepareStorage().then(() => {
				mongoose.connect(dbUri).then((res, err) => {
					if (err) reject(err);

					resolve('mockgoose');
				});
			});
		} else {
			mongoose
				.connect(dbUri, {
					user: dbUser,
					pass: dbPass
				})
				.then((res, err) => {
					if (err) reject(err);

					resolve('mongoose');
				});
		}
	});
};

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description DB 연결 종료
 */
export const close = () => {
	if (process.env.NODE_ENV === 'development') new Mockgoose(mongoose).helper.reset();

	return mongoose.disconnect();
};
