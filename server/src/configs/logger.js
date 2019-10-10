import config from 'configs';
const env = config;

const logConfig = {
	enabled: process.env.LOG_ENABLED || [ 'production', 'development' ].includes(env),
	level: process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'all')
};

export default logConfig;
