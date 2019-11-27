import clc from 'cli-color';
import * as db from 'models';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';

describe(clc.bgGreen(clc.black('[ Link ]')), () => {
	let server;
	let accessToken;
	let id;

    before((done) => {
        db.connect().then((type) => {
            console.log(clc.yellow(`    Connected ${type}`));

            server = app.listen(4000, () => {
                console.log(clc.yellow('    Server localhost:4000'));
				done();
            })
        })
    })

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

	it('링크 추가', (done) => {
		request(server)
			.post('/api/links')
			.send({
				title: '새로운 링크',
				to: 'http://minz-log.info'
			})
			.set('Cookie', accessToken)
			.expect(200)
			.end((err, ctx) => {
				if(err) throw err;

				const { _id, title, to } = ctx.body.data;
				id = _id;
				
				expect(title).to.equal('새로운 링크');
				expect(to).to.equal('http://minz-log.info');
				done();
			})
	})

	it('링크 목록 조회', (done) => {
		request(server)
			.get('/api/links?page=1')
			.expect(200)
			.end((err, ctx) => {
				if(err) throw err;

				expect(ctx.body.data).have.length(1);
				done();
			})
	})

	it('링크 카운트', (done) => {
		request(server)
			.get('/api/links/count')
			.expect(200)
			.end((err, ctx) => {
				if(err) throw err;

				expect(ctx.body.data).to.equal(1);
				done();
			})
	})

	it('링크 조회', (done) => {
		request(server)
			.get(`/api/links/${id}`)
			.expect(200)
			.end((err, ctx) => {
				if(err) throw err;

				const { _id, title, to } = ctx.body.data;

				expect(_id).to.equal(id);
				expect(title).to.equal('새로운 링크');
				expect(to).to.equal('http://minz-log.info');
				expect(ctx.body.data).haveOwnProperty('publishedDate');
				done();
			})
	})
})
