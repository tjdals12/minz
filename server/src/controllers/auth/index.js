import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

/**
 * @swagger
 * definitions:
 *  account:
 *      type: object
 *      required:
 *          - profile
 *          - email
 *          - password
 *      properties:
 *          profile:
 *              type: object
 *              properties:
 *                  username: 
 *                      type: string
 *                  thumbnail:
 *                      type: string
 *          email:
 *              type: string
 *          social:
 *              type: object
 *              properties:
 *                  facebook:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          accessToken:
 *                              type: string
 *                  google:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          accessToken:
 *                              type: string
 *          password:
 *              type: string
 *          thoughCount:
 *              type: number
 *              default: 0
 *          myposts:
 *              type: array
 *              items:
 *                  type: string
 *          createdAt:
 *              type: string
 *              format: date-time
 */

/**
 * @swagger
 * /api/auth/register/local:
 *  post:
 *      tags:
 *          - Auth
 *      summary: 로컬 회원가입
 *      description: 로컬 회원가입
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: Register parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: 'mlog@minzlog.info'
 *                  password:
 *                      type: string
 *                      example: 'a12345'
 *                  username:
 *                      type: string
 *                      example: 'Minz'
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: object
 *                  properties:
 *                      thumbnail:
 *                          type: string
 *                          example: "http://minz-log-image.s3-ap-northeast-2.amazonaws.com/default_profile.png"
 *                      username:
 *                          type: string
 *                          example: 'Minz'
 *                  
 */
auth.post('/register/local', authCtrl.localRegister);

/**
 * @swagger
 * /api/auth/login/local:
 *  post:
 *      tags:
 *          - Auth
 *      summary: 로컬 로그인
 *      description: 로컬 로그인
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            description: Login parameters
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: 'mlog@minzlog.info'
 *                  password:
 *                      type: string
 *                      example: 'a12345'
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                          format: ObjectId
 *                      profile:
 *                          type: object
 *                          properties:
 *                              thumbnail:
 *                                  type: string
 *                              username:
 *                                  type: string
 */
auth.post('/login/local', authCtrl.localLogin);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *      tags:
 *          - Auth
 *      summary: 로그아웃
 *      description: 로그아웃
 *      consumes:
 *          - application/json  
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 */
auth.post('/logout', authCtrl.logout);

/**
 * @swagger
 * /api/auth/check:
 *  get:
 *      tags:
 *          - Auth
 *      summary: 로그인 여부 확인
 *      description: 로그인 여부 확인
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successful operation
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                          format: ObjectId
 *                      profile:
 *                          type: object
 *                          properties:
 *                              thumbnail:
 *                                  type: string
 *                              username:
 *                                  type: string
 */
auth.get('/check', authCtrl.check);

auth.post('/register/:provider(facebook|google)/social', authCtrl.socialRegister);
auth.post('/login/:provider(facebook|google)/social', authCtrl.socialLogin);

export default auth;
