import Router from 'koa-router';
import * as seriesCtrl from './series.ctrl';

const series = new Router();

/**
 * @swagger
 * definitions:
 *  series:
 *      type: object
 *      required:
 *          - thumbnail
 *          - name
 *          - description
 *          - keyword
 *      properties:
 *          seq:
 *              type: string
 *          thumbnail:
 *              type: string
 *          name:
 *              type: string
 *          writer:
 *              type: string
 *          keyword:
 *              type: string
 *          description:
 *              type: string
 *          post:
 *              type: string
 *          dispGb:
 *              type: string
 *          finishGb:
 *              type: string
 *          publishedDate:
 *              type: string
 *              format: date-time
 */

/**
 * @swagger
 * /api/series:
 *  get:
 *      tags:
 *          - Series
 *      summary: 시리즈 목록 조회
 *      description: 시리즈 목록 조회
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
 *                  type: array
 *                  items:
 *                      type: object
 *                      $ref: '#/definitions/series'
 */
series.get('/', seriesCtrl.list);

/**
 * @swagger
 * /api/series/keywords:
 *  get:
 *      tags:
 *          - Series
 *      summary: 모든 키워드 조회
 *      description: 모든 키워드 조회
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
series.get('/keywords', seriesCtrl.keywords);

/**
 * @swagger
 * /api/series:
 *  post:
 *      tags:
 *          - Series
 *      summary: 시리즈 생성
 *      description: 시리즈 생성
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: Series parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  thumbnail:
 *                      type: string
 *                      example: 'https://minz-log-image.s3.ap-northeast-2.amazonaws.com/1551000318821.jpg'
 *                  name:
 *                      type: string
 *                      example: 'MKRN 스택'
 *                  description:
 *                      type: string
 *                      example: 'Mongo + Koa + React + Nodejs로 풀스택 개발하기'
 *                  keyword:
 *                      type: array
 *                      example: [ 'Mongo', 'Koa', 'React', 'Nodejs' ]
 *                      items:
 *                          type: strnig
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/series'
 */
series.post('/', seriesCtrl.create);

/**
 * @swagger
 * /api/series/{seq}:
 *  get:
 *      tags:
 *          - Series
 *      summary: 시리즈 조회
 *      description: 시리즈 조회
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seq
 *            description: series seq
 *            required: true
 *            type: number
 *            example: 1
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/series'
 */
series.get('/:seq', seriesCtrl.read);

/**
 * @swagger
 * /api/series/{seq}:
 *  post:
 *      tags:
 *          - Series
 *      summary: 시리즈에 포스트 작성
 *      description: 시리즈에 포스트 작성
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seq
 *            description: series seq
 *            required: true
 *            type: number
 *            example: 1
 *          - in: body
 *            name: body
 *            description: post parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: ''
 *                  body:
 *                      type: string
 *                      example: ''
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/post'
 */
series.post('/:seq', seriesCtrl.write);

/**
 * @swagger
 * /api/series/{seq}:
 *  patch:
 *      tags:
 *          - Series
 *      summary: 시리즈 수정
 *      description: 시리즈 수정
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seq
 *            description: series seq
 *            required: true
 *            type: number
 *            example: 1
 *          - in: body
 *            name: body
 *            description: edit parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:       
 *                  thumbnail:
 *                      type: string
 *                      example: ''
 *                  name:
 *                      type: string
 *                      example: ''
 *                  description:
 *                      type: string
 *                      example: ''
 *                  keyword:
 *                      type: array
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/series'
 */
series.patch('/:seq', seriesCtrl.update);

/**
 * @swagger
 * /api/series/{seq}/toggle:
 *  patch:
 *      tags:
 *          - Series
 *      summary: 시리즈 공개 / 비공개
 *      description: 시리즈 공개 / 비공개
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seq
 *            description: series seq
 *            required: true
 *            type: number
 *            example: 1
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/series'
 */
series.patch('/:seq/toggle', seriesCtrl.toggleDispGb);

series.get('/count', seriesCtrl.count);

export default series;
