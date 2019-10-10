import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
	base: {
		env,
		name: process.env.APP_NAME || 'minz-log-server',
		host: process.env.APP_HOST || '127.0.0.1',
		port: process.env.APP_PORT || 4000,
		dbUri: process.env.DB_URI,
		dbUser: process.env.DB_USER,
		dbPass: process.env.DB_PASS
	},
	production: {
		dbUri: 'mongodb://127.0.0.1:27017/blog'
	},
	development: {
		dbUri: 'mongodb://127.0.0.1:27017/admin'
	},
	test: {
		dbUri: 'mongodb://127.0.0.1:27017/admin'
	}
};

const config = Object.assign(configs.base, configs[env]);

export default config;
