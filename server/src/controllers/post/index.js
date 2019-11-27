import Router from 'koa-router';
import * as postCtrl from './post.ctrl';
import * as commonCtrl from 'controllers/common.ctrl';

const post = new Router();

/**
 * @swagger
 * definitions:
 *  post:
 *      type: object
 *      required:
 *          - title
 *          - body
 *          - tags
 *      properties:
 *          title:
 *              type: string
 *          body:
 *              type: string
 *          tags:
 *              type: array
 *              example: [ '태그 1', '태그 2', '태그 3' ]
 *              items:
 *                  type: string
 *          hit:
 *              type: number
 *              default: 0
 *          like:
 *              type: number
 *              default: 0
 *          dispGb:
 *              type: boolean
 *              default: true
 *          category:
 *              type: string
 *              format: ObjectId
 *              example: 5ca8a145bbcec50c06e9ed2d
 *          series:
 *              type: object
 *              properties:
 *                  seq:
 *                      type: number
 *                      default: 9999
 *                  subSeq:
 *                      type: number
 *                      default: 1
 *          comments:
 *              type: array
 *              example: [ '5ca8a145bbcec50c06e9ed2d' ]
 *              items:
 *                  type: string
 *                  format: ObjectId
 *          writer:
 *              type: string
 *          publishedDate:
 *              type: string
 *              format: date-time
 */

/**
 * @swagger
 * /api/posts:
 *  post:
 *      tags:
 *          - Post
 *      summary: 포스트 작성
 *      description: 포스트 작성
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: Post parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: 포스트 제목
 *                  body:
 *                      type: string
 *                      example: 포스트 내용
 *                  tags:
 *                      type: array
 *                      example: [ '태그 1', '태그 2', '태그 3' ]
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.post('/', postCtrl.write);

/**
 * @swagger
 * /api/posts:
 *  get:
 *      tags:
 *          - Post
 *      summary: 포스트 목록 조회
 *      description: 포스트 목록 조회
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: query
 *            name: page
 *            description: page number
 *            type: string
 *            example: 1
 *      responses:
 *          200:    
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.get('/', postCtrl.list);

/**
 * @swagger
 * /api/posts/tags:
 *  get:
 *      tags:
 *          - Post
 *      summary: 모든 태그 조회
 *      description: 모든 태그 조회
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: array
 *                  example: ['First', 'Second']
 *                  items:
 *                      type: string
 */
post.get('/tags', postCtrl.tags);

/**
 * @swagger
 * /api/posts/count:
 *  get:
 *      tags:  
 *          - Post
 *      summary: 포스트 카운트
 *      description: 포스트 카운트
 *      produces:
 *          - application/json
 *      responses:   
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: object
 *                  properties:
 *                      count:
 *                          type: number
 *                      todayCount:
 *                          type: number
 */
post.get('/count', postCtrl.count);

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *      tags:
 *          - Post
 *      summary: 포스트 조회
 *      description: 포스트 조회
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.get('/:id', commonCtrl.checkObjectId, postCtrl.read);

/**
 * @swagger
 * /api/posts/{id}/foredit:
 *  get:
 *      tags:
 *          - Post
 *      summary: 포스트 조회 for edit
 *      description: 포스트 조회 for edit
 *      produces:
 *          - application/json
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      title:
 *                          type: string
 *                      body:
 *                          type: string
 *                      tags:
 *                          type: string
 */
post.get('/:id/foredit', commonCtrl.checkObjectId, postCtrl.readForEdit);

/**
 * @swagger
 * /api/posts/{id}:
 *  patch:
 *      tags:
 *          - Post
 *      summary: 포스트 수정
 *      description: 포스트 수정
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *          - in: body
 *            name: body
 *            descriptipon: Post update parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: '포스트 수정'
 *                  body:
 *                      type: string
 *                      example: '수정'
 *                  tags:
 *                      type: array
 *                      example: [ '수정1', '수정2' ]
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.patch('/:id', commonCtrl.checkObjectId, postCtrl.update);

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *      tags:
 *          - Post
 *      summary: 포스트 삭제
 *      description: 포스트 삭제
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *      responses:
 *          200:
 *              descriptipon: Successful operation
 */
post.delete('/:id', commonCtrl.checkObjectId, postCtrl.deletePost);

/**
 * @swagger
 * /api/posts/{id}/prev:
 *  get:
 *      tags:
 *          - Post
 *      summary: 이전 포스트
 *      description: 이전 포스트
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: id
 *            name: id
 *            description: Post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.get('/:id/prev', commonCtrl.checkObjectId, postCtrl.prev);

/**
 * @swagger
 * /api/posts/{id}/next:
 *  get:
 *      tags:
 *          - Post
 *      summary: 다음 포스트
 *      description: 다음 포스트
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: id
 *            name: id
 *            description: Post id
 *            required: true
 *            type: string
 *            example: 5ca8a145bbcec50c06e9ed2d
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.get('/:id/next', commonCtrl.checkObjectId, postCtrl.next);

/**
 * @swagger
 * /api/posts/search:
 *  post:
 *      tags:
 *          - Post
 *      summary: 포스트 검색
 *      description: 포스트 검색
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            descriptipn: Search parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  keyword:
 *                      type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
post.post('/search', postCtrl.search);

export default post;
