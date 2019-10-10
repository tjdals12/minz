import logConfig from 'configs/logger';
const { enabled, level } = logConfig;

import morgan from 'koa-morgan';
import fs from 'fs';
import moment from 'moment';

const logSettings = (app) => {
	if (enabled) {
		level === 'all' &&
			app.use(
				morgan('combined', {
					stream: fs.createWriteStream(__dirname + `/logs/access_${moment().format('YYYYMMDD')}.log`, {
						flags: 'a'
					}),
					skip: (req, res) => {
						return res.statusCode >= 400;
					}
				})
			);

		return;
	}

	app.use(
		morgan('combined', {
			stream: fs.createWriteStream(__dirname + `/logs/access_${moment().format('YYYYMMDD')}.log`, {
				flags: 'a'
			}),
			skip: (req, res) => {
				return res.statusCode < 400;
			}
		})
	);
};

export default logSettings;
