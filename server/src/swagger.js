import swaggerUI from 'swagger-ui-koa';
import swaggerJSDoc from 'swagger-jsdoc';
import mount from 'koa-mount';
import convert from 'koa-convert';

const options = {
	swaggerDefinition: {
		info: {
			title: 'Blog API',
			version: '1.0.0',
			description: 'Minz-log Blog API'
		}
		// securityDefinitions: {
		// 	jwt: {
		// 		type: 'apiKey',
		// 		name: 'Authorization',
		// 		in: 'header'
		// 	}
		// },
		// security: [ { jwt: [] } ]
	},
	apisSorter: 'method',
	operationsSorter: 'method',
	apis: [ './src/controllers/*/index.js' ]
};

/**
 * @author      minz-logger
 * @date        2019. 09. 09
 * @description Swagger 설정
 */
const swaggerSettings = (app) => {
	app.use(swaggerUI.serve);
	app.use(convert(mount('/swagger', swaggerUI.setup(swaggerJSDoc(options)))));
};

export default swaggerSettings;
