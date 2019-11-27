import clc from 'cli-color';
import * as db from 'models';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Post ]')), () => {
	let server;
	let accessToken;
	let prevPostId;
	let postId;
	let nextPostId;

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
				expect(ctx.body.data).to.have.property('count');
				done();
			});
	});

	it('이전 포스트 작성', (done) => {
		request(server)
			.post('/api/posts')
			.send({
				title: '이전 포스트 제목',
				body: '내용',
				tags: [ '태그 1', '태그 2', '태그 3' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				prevPostId = ctx.body.data._id;

				expect(ctx.body.data.title).to.equal('이전 포스트 제목');
				expect(ctx.body.data.body).to.equal('내용');
				expect(ctx.body.data.tags).have.length(3);
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

	it('다음 포스트 작성', (done) => {
		request(server)
			.post('/api/posts')
			.send({
				title: '다음 포스트 제목',
				body: '내용',
				tags: [ '태그 1', '태그 2', '태그 3' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				nextPostId = ctx.body.data._id;

				expect(ctx.body.data.title).to.equal('다음 포스트 제목');
				expect(ctx.body.data.body).to.equal('내용');
				expect(ctx.body.data.tags).have.length(3);
				done();
			});
	});

	it('포스트 목록 조회', (done) => {
		request(server).get('/api/posts').expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(3);
			done();
		});
	});

	it('모든 태그 조회', (done) => {
		request(server).get('/api/posts/tags').expect(200).end((err, ctx) => {
			if(err) throw err;

			/** 중복을 제거하기 때문에 3 개 */
			expect(ctx.body.data).have.length(3);
			done();
		})
	})

	it('포스트 카운트', (done) => {
		request(server).get('/api/posts/count').expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data.count).to.equal(3);
			expect(ctx.body.data.todayCount).to.equal(3);
			done();
		});
	});

	it('포스트 조회', (done) => {
		request(server).get(`/api/posts/${postId}`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data._id).to.equal(postId);
			done();
		});
	});

	it('포스트 수정', (done) => {
		request(server)
			.patch(`/api/posts/${postId}`)
			.send({
				title: '포스트 수정',
				body: '수정',
				tags: [ '수정1', '수정2' ]
			})
			.expect(200)
			.set('Cookie', accessToken)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.title).to.equal('포스트 수정');
				expect(ctx.body.data.body).to.equal('수정');
				expect(ctx.body.data.tags).have.length(2);
				done();
			});
	});

	it('이전 포스트', (done) => {
		request(server).get(`/api/posts/${postId}/prev`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data._id).to.equal(prevPostId);
			done();
		});
	});

	it('다음 포스트', (done) => {
		request(server).get(`/api/posts/${postId}/next`).expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data._id).to.equal(nextPostId);
			done();
		});
	});

	it('포스트 검색', (done) => {
		request(server)
			.post(`/api/posts/search`)
			.send({
				keyword: '이전'
			})
			.expect(200)
			.end((err, ctx) => {
				if (err) throw err;

				expect(ctx.body.data.searchPosts).have.length(1);
				expect(ctx.body.data.count).to.equal(1);
				done();
			});
	});

	it('포스트 삭제', (done) => {
		request(server).delete(`/api/posts/${postId}`).expect(200).set('Cookie', accessToken).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).to.be.empty;
			done();
		});
	});

	it('포스트 삭제 후 목록 조회', (done) => {
		request(server).get('/api/posts').expect(200).end((err, ctx) => {
			if (err) throw err;

			expect(ctx.body.data).have.length(2);
			done();
		});
	});
});
