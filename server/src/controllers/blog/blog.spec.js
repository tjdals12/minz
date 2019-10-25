import clc from 'cli-color';
import * as db from 'models';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Blog ]')), () => {
	let server;
	let accessToken;

	before((done) => {
		db.connect().then((type) => {
			console.log(clc.yellow(`    Connected ${type}`));

			server = app.listen(() => {
				console.log(clc.yellow('    Server localhost:4000'));
				done();
			});
		});
	});

	after((done) => {
		db
			.close()
			.then(() => {
				server.close();
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it('로컬 회원가입', (done) => {
		request(server)
			.post('/api/auth/register/local')
			.send({
				email: 'mlog@minzlog.info',
				password: 'a12345',
				username: 'Minz-logger'
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
				expect(ctx.body.data).to.have.property('count');
				done();
			});
	});

	it('블로그 정보 생성', (done) => {
		request(server)
			.post('/api/blogs')
			.send({
				background: 'http://backgroundurl.com',
				thumbnail: 'http://thumbnailurl.com',
				title: '대문 타이틀',
				name: '사용자 이름',
				info: '사용자 설명',
				description: '블로그 설명',
				tags: [ 'Tag 1', 'Tag 2' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				const { background, thumbnail, title, name, info, description, tags } = ctx.body.data;

				expect(background).to.equal('http://backgroundurl.com');
				expect(thumbnail).to.equal('http://thumbnailurl.com');
				expect(title).to.equal('대문 타이틀');
				expect(name).to.equal('사용자 이름');
				expect(info).to.equal('사용자 설명');
				expect(description).to.equal('블로그 설명');
				expect(tags).have.length(2);
				done();
			});
	});

	it('블로그 정보 조회', (done) => {
		request(server).get('/api/blogs').expect(200).end((err, ctx) => {
			if (err) throw err;

			const { background, thumbnail, title, name, info, description, tags } = ctx.body.data;

			expect(background).to.equal('http://backgroundurl.com');
			expect(thumbnail).to.equal('http://thumbnailurl.com');
			expect(title).to.equal('대문 타이틀');
			expect(name).to.equal('사용자 이름');
			expect(info).to.equal('사용자 설명');
			expect(description).to.equal('블로그 설명');
			expect(tags).have.length(2);
			expect(ctx.body.data).haveOwnProperty('postCount');
			expect(ctx.body.data).haveOwnProperty('todayPostCount');
			expect(ctx.body.data).haveOwnProperty('seriesCount');
			done();
		});
	});

	it('블로그 정보 수정', (done) => {
		request(server)
			.patch('/api/blogs')
			.send({
				background: 'http://editbackground.com',
				thumbnail: 'http://editthumbnail.com',
				title: '수정된 대문 타이틀',
				name: '수정된 사용자 이름',
				info: '수정된 사용자 설명',
				description: '수정된 블로그 설명',
				tags: [ 'Tag 1', 'Tag 2', 'Tag 3' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				const { background, thumbnail, title, name, info, description, tags } = ctx.body.data;

				expect(background).to.equal('http://editbackground.com');
				expect(thumbnail).to.equal('http://editthumbnail.com');
				expect(title).to.equal('수정된 대문 타이틀');
				expect(name).to.equal('수정된 사용자 이름');
				expect(info).to.equal('수정된 사용자 설명');
				expect(description).to.equal('수정된 블로그 설명');
				expect(tags).have.length(3);
				done();
			});
	});
});
