import Router from 'koa-router';
import * as blogCtrl from './blog.ctrl';

const blog = new Router();

/**
 * @swagger
 * definitions:
 *  blog:
 *      type: object
 *      required:
 *          _ background
 *          _ thumbnail
 *          _ title
 *          _ name
 *          _ description
 *          _ info
 *          _ tags
 *      properties:
 *          background:
 *              type: string
 *              example: 'https://minz-log-image.s3.ap-northeast-2.amazonaws.com/1568011090199.jpg'
 *          thumbnail:
 *              type: string
 *              example: 'https://minz-log-image.s3.ap-northeast-2.amazonaws.com/1568011007601.png'
 *          title:
 *              type: string
 *              example: 'Full Stack'
 *          name:
 *              type: string
 *              example: 'Minz logger'
 *          description:
 *              type: string
 *              example: '풀스택 개발자 가 되고 싶은..'
 *          info:
 *              type: string
 *              example: '그냥 궁금한 것들,까먹고 싶지 않은 것들배우는 것들을 기록'
 *          tags:
 *              type: array
 *              example: [ 'Javascript', 'Nodejs', 'React', 'MongoDB' ]
 *              items:
 *                  type: string
 */

/**
  * @swagger
  * /api/blogs:
  *     post:
  *         tags:
  *             - Blog
  *         summary: 블로그 정보 저장
  *         description: 블로그 정보 저장
  *         consumes:
  *             - application/json
  *         produces:
  *             - application/json
  *         parameters:
  *             - in: body
  *               name: body
  *               description: blog parameters
  *               required: true
  *               schema:
  *                 type: object
  *                 properties:
  *                     background:
  *                         type: string
  *                         example: 'http://backgroundurl.com'
  *                     thumbnail:
  *                         type: string
  *                         exaple: 'http://thumbnailurl.com'
  *                     title:
  *                         type: string
  *                         example: ''
  *                     name:
  *                         type: string
  *                         example: ''
  *                     info:
  *                         type: string
  *                         example: ''
  *                     description:
  *                         type: string
  *                         example: ''
  *                     tags:
  *                         type: array
  *                         items:
  *                             type: string
  *         responses:
  *             200:
  *                 description: Successful operation
  *                 schema:
  *                     $ref: '#/definitions/blog'
  */
blog.post('/', blogCtrl.create);

/**
 * @swagger
 * /api/blogs:
 *  get:
 *      tags:
 *          - Blog
 *      summary: 블로그 정보
 *      description: 블로그 정보
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/blog'
 */
blog.get('/', blogCtrl.getInfo);

/**
 * @swagger
 * /api/blogs:
 *  patch:
 *      tags:
 *          - Blog
 *      summary: 블로그 정보 수정
 *      description: 블로그 정보 수정
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: blog parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  background:
 *                      type: string
 *                      example: 'edit'
 *                  thumbnail:
 *                      type: string
 *                      example: 'edit'
 *                  title:
 *                      type: string
 *                      example: 'Edit Header Title'
 *                  name:
 *                      type: string
 *                      example: 'Edit Name'
 *                  description:
 *                      type: string
 *                      example: 'Edit Description'
 *                  info:
 *                      type: string
 *                      example: 'Edit Info'
 *                  tags:
 *                      type: array
 *                      example: [ 'Edit', 'Tags' ]
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  $ref: '#/definitions/blog'
 */
blog.patch('/', blogCtrl.edit);

export default blog;
