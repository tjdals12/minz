import * as db from 'models';
import app from 'app';
import clc from 'cli-color';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Auth ]')), () => {
	let server;
	let accessToken;

	before((done) => {
		db.connect().then((type) => {
			console.log(clc.yellow(`  Connected ${type}`));

			server = app.listen(4000, () => {
				console.log(clc.yellow('  Server localhost:4000'));
				done();
			});
		});
	});

	after((done) => {
		db.close()
			.then(() => {
				server.close();
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('로그인 전 로그인 확인', (done) => {
		request(server)
			.get('/api/auth/check')
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data).to.be.empty;
				done();
			});
	})

	it('로컬 회원가입', (done) => {
		request(server)
			.post('/api/auth/register/local')
			.send({
				email: 'mlog@minzlog.info',
				password: 'a12345',
				username: 'Minz'
			})
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data).to.have.property('thumbnail');
				expect(ctx.body.data).to.have.property('username');
				done();
			});
	});

	it('로컬 로그인', (done) => {
		request(server)
			.post('/api/auth/login/local')
			.send({
				email: 'mlog@minzlog.info',
				password: 'a12345'
			})
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				accessToken = ctx.res.headers['set-cookie'][0];

				expect(ctx.body.data).to.have.property('id');
				expect(ctx.body.data).to.have.property('profile');
				expect(ctx.body.data.profile).to.have.property('thumbnail');
				expect(ctx.body.data.profile).to.have.property('username');
				expect(ctx.body.data).to.have.property('thoughCount');
				done();
			});
	});

	it('로그인 후 로그인 확인', (done) => {
		request(server)
			.get('/api/auth/check')
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data).to.have.property('id');
				expect(ctx.body.data).to.have.property('profile');
				expect(ctx.body.data.profile).to.have.property('thumbnail');
				expect(ctx.body.data.profile).to.have.property('username');
				expect(ctx.body.data).to.have.property('thoughCount');
				done();
			})
	})
});
