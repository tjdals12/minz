import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl';

const comment = new Router();

/**
 * @swagger
 * definitions:
 *  comment:
 *      type: object
 *      required:
 *          - content
 *          - postId
 *          - writer
 *      properties:
 *          content:
 *              type: string
 *          postId:
 *              type: string
 *              format: ObjectId
 *              example: '5ca8a145bbcec50c06e9ed2d'
 *          writer:
 *              type: string
 *          publishedDate:
 *              type: string
 *              format: date-time
 */

/**
 * @swagger
 * /api/comments:
 *  post:
 *      tags:
 *          - Comment
 *      summary: 댓글 작성
 *      description: 댓글 작성
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: comment parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  postId:
 *                      type: string
 *                      example: '5ca8a145bbcec50c06e9ed2d'
 *                  comment:
 *                      type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/comment'
 */
comment.post('/', commentCtrl.checkObjectId, commentCtrl.writeComment);

/**
 * @swagger
 * /api/comments/{postId}/list:
 *  get:
 *      tags:
 *          - Comment
 *      summary: 댓글 목록 조회
 *      description: 댓글 목록 조회
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: postId
 *            description: Post Id
 *            required: true
 *            type: string
 *            example: '5ca8a145bbcec50c06e9ed2d'
 *          - in: query
 *            name: page
 *            description: page number
 *            type: string
 *            example: 1
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/comment'
 */
comment.get('/:postId/list', commentCtrl.commentList);

/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *      tags:
 *          - Comment
 *      summary: 댓글 조회
 *      description: 댓글 조회
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: comment id
 *            required: true
 *            type: string
 *            example: '5ca8a145bbcec50c06e9ed2d'
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/comment'
 */
comment.get('/:id', commentCtrl.readComment);

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *      tags:
 *          - Comment
 *      summary: 댓글 삭제
 *      description: 댓글 삭제
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: comment id
 *            required: true
 *            type: string
 *            example: '5ca8a145bbcec50c06e9ed2d'
 *      responses:
 *          200:
 *              description: Successful operation
 */
comment.delete('/:id', commentCtrl.deleteComment);

export default comment;
