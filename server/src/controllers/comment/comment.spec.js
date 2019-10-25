import clc from 'cli-color';
import * as db from 'models';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Comment ]')), () => {
	let server;
	let accessToken;
	let postId;
	let commentId;

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

	it('포스트 작성', (done) => {
		request(server)
			.post('/api/posts')
			.send({
				title: '포스트 제목',
				body: '내용',
				tags: [ '태그 1', '태그 2', '태그 3' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				postId = ctx.body.data._id;

				expect(ctx.body.data.title).to.equal('포스트 제목');
				expect(ctx.body.data.body).to.equal('내용');
				expect(ctx.body.data.tags).have.length(3);
				done();
			});
	});

	it('댓글 작성 1', (done) => {
		request(server)
			.post('/api/comments')
			.send({
				postId: postId,
				content: '댓글 작성 1'
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				commentId = ctx.body.data._id;

				expect(ctx.body.data.writer).to.equal('Minz-logger');
				expect(ctx.body.data.postId).to.equal(postId);
				expect(ctx.body.data.content).to.equal('댓글 작성 1');
				done();
			});
	});

	it('댓글 목록 조회', (done) => {
		request(server).get(`/api/comments/${postId}/list`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(1);
			done();
		});
	});

	it('댓글 작성 2', (done) => {
		request(server)
			.post('/api/comments')
			.send({
				postId: postId,
				content: '댓글 작성 2'
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.writer).to.equal('Minz-logger');
				expect(ctx.body.data.postId).to.equal(postId);
				expect(ctx.body.data.content).to.equal('댓글 작성 2');
				done();
			});
	});

	it('댓글 작성 후 목록 조회', (done) => {
		request(server).get(`/api/comments/${postId}/list`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(2);
			done();
		});
	});

	it('댓글 조회', (done) => {
		request(server).get(`/api/comments/${commentId}`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data._id).to.equal(commentId);
			done();
		});
	});

	it('댓글 삭제', (done) => {
		request(server).delete(`/api/comments/${commentId}?postId=${postId}`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data.comments).have.length(1);
			done();
		});
	});
});
