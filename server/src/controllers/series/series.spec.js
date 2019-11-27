import clc from 'cli-color';
import * as db from 'models';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Series ]')), () => {
	let server;
	let accessToken;
	let seriesSeq;

	before((done) => {
		db.connect().then((type) => {
			console.log(clc.yellow(`    Connected ${type}`));

			server = app.listen(4000, () => {
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

	it('시리즈 생성 1', (done) => {
		request(server)
			.post('/api/series')
			.send({
				thumbnail: 'http://thumbnailurl.com',
				name: 'Docker 배우기',
				description: 'Docker 설치 및 기본 명령어',
				keyword: [ 'Docker', '도커' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				const { seq, thumbnail, name, description, keyword } = ctx.body.data;

				seriesSeq = seq;

				expect(thumbnail).to.equal('http://thumbnailurl.com');
				expect(name).to.equal('Docker 배우기');
				expect(description).to.equal('Docker 설치 및 기본 명령어');
				expect(keyword).have.length(2);
				done();
			});
	});

	it('시리즈 목록 조회', (done) => {
		request(server).get('/api/series').expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(1);
			done();
		});
	});

	it('모든 키워드 조회', (done) => {
		request(server).get('/api/series/keywords').expect(200).end((err, ctx) => {
			if(err) throw err;

			expect(ctx.body.data).have.length(2);
			done();
		});
	});

	it('시리즈 생성 2', (done) => {
		request(server)
			.post('/api/series')
			.send({
				thumbnail: 'http://thumbnailurl.com',
				name: 'Ubuntu 배우기',
				description: 'Ubuntu 기본 명령어 및 VM으로 돌리기',
				keyword: [ 'Ubuntu', '우분투' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				const { thumbnail, name, description, keyword } = ctx.body.data;

				expect(thumbnail).to.equal('http://thumbnailurl.com');
				expect(name).to.equal('Ubuntu 배우기');
				expect(description).to.equal('Ubuntu 기본 명령어 및 VM으로 돌리기');
				expect(keyword).have.length(2);
				done();
			});
	});

	it('시리즈 생성 후 목록 조회', (done) => {
		request(server).get('/api/series').expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(2);
			done();
		});
	});

	it('시리즈 조회', (done) => {
		request(server).get(`/api/series/${seriesSeq}`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data.seq).to.equal(seriesSeq);
			done();
		});
	});

	it('시리즈에 포스트 작성 1', (done) => {
		request(server)
			.post(`/api/series/${seriesSeq}`)
			.send({
				title: 'Docker 설치하기',
				body: 'Docker 설치',
				tags: [ 'Docker', '도커', '설치' ]
			})
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.post).have.length(1);
				done();
			});
	});

	it('시리즈에 포스트 작성 2', (done) => {
		request(server)
			.post(`/api/series/${seriesSeq}`)
			.send({
				title: 'Docker 기본 명령어',
				body: 'Docker 명령어',
				tags: [ 'Docker', '도커', '명령어' ]
			})
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.post).have.length(2);
				done();
			});
	});

	it('시리즈 수정', (done) => {
		request(server)
			.patch(`/api/series/${seriesSeq}`)
			.send({
				thumbnail: 'http://thumbnail.com',
				name: 'Docker 튜토리얼',
				description: 'Docker 튜토리얼',
				keyword: [ 'Docker', '도커', '튜토리얼' ]
			})
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				const { thumbnail, name, description, keyword } = ctx.body.data;

				expect(thumbnail).to.equal('http://thumbnail.com');
				expect(name).to.equal('Docker 튜토리얼');
				expect(description).to.equal('Docker 튜토리얼');
				expect(keyword).have.length(3);
				done();
			});
	});

	it('시리즈 비공개', (done) => {
		request(server)
			.patch(`/api/series/${seriesSeq}/toggle`)
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.dispGb).to.equal('02');
				done();
			});
	});

	it('시리즈 공개', (done) => {
		request(server)
			.patch(`/api/series/${seriesSeq}/toggle`)
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.dispGb).to.equal('01');
				done();
			});
	});
});
