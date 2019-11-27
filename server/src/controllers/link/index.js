import Router from 'koa-router';
import * as commonCtrl from 'controllers/common.ctrl';
import * as linkCtrl from './link.ctrl';

const link = new Router();

/**
 * @swagger
 * definitions:
 *  link:
 *      type: object
 *      required:
 *          - title
 *          - link
 *      properties:
 *          title:
 *              type: string
 *          link:
 *              type: string
 */

/**
 * @swagger
 * /api/links:
 *  post:
 *      tags:
 *          - Link
 *      summary: 링크 추가
 *      description: 링크 추가
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: Link parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: ''
 *                  link:
 *                      type: string
 *                      example: ''
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/link'
 */
link.post('/', linkCtrl.add);

/**
 * @swagger
 * /api/links:
 *  get:
 *      tags:
 *          - Link
 *      summary: 링크 목록 조회
 *      description: 링크 목록 조회
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
 *                      $ref: '#/definitions/link'
 */
link.get('/', linkCtrl.list);

/**
 * @swagger
 * /api/links/count:
 *  get:
 *      tags:
 *          - Link
 *      summary: 링크 카운트
 *      description: 링크 카운트
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: number
 *                  example: 30
 */
link.get('/count', linkCtrl.count);

/**
 * @swagger
 * /api/links/{id}:
 *  get:
 *      tags:
 *          - Link
 *      summary: 링크 조회
 *      description: 링크 조회
 *      parameters:
 *          - in: path
 *            name: id
 *            description: link id
 *            required: true
 *            type: string
 *            example: 5dde24bd14d60d2bd88294dd
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/link'
 */
link.get('/:id', commonCtrl.checkObjectId, linkCtrl.one);

export default link;