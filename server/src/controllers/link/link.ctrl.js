import Link from 'models/link';
import Joi from 'joi';

/**
 * @author      minz-logger
 * @date        2019. 11. 27
 * @description 링크 추가
 */
export const add = async (ctx) => {
    const user = ctx.request.user;

	if (!user) {
		ctx.res.unauthorized({
			data: { user: user },
			message: 'unauthorized'
		});

		return;
    }
    
    const {
        title,
        to
    } = ctx.request.body;

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        to: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.res.badRequest({
            data: result.error,
            message: 'Fail - linkCtrl > add'
        });

        return;
    }

    try{
        const link = await Link.saveLink({ title, to });

        ctx.res.ok({
            data: link,
            message: 'Success - linkCtrl > add'
        });
    }catch(e) {
        ctx.res.internalServerError({
            data: ctx.request.body,
            message: `Error - linkCtrl > add: ${e.message}`
        });
    }
};

/**
 * @author      minz-logger
 * @date        2019. 11. 27
 * @description 링크 목록 조회
 */
export const list = async (ctx) => {
    let page = parseInt(ctx.query.page || 1, 10);

    if(page < 1){
        ctx.res.badRequest({
            data: page,
            message: 'Fail - postCtrl > list'
        });

        return;
    }

    try{
        const links = await Link
            .find()
            .sort({ _id: -1 })
            .limit(page * 20);

        const count = await Link.countDocuments();

        ctx.set('Last-Page', Math.ceil(count / 20));

        ctx.res.ok({
            data: links,
            message: 'links'
        })
    }catch(e) {
        ctx.res.internalServerError({
            message: `Error - linkCtrl > list: ${e.message}`
        });
    }
};

/**
 * @author      minz-logger
 * @date        2019. 11. 27
 * @description 링크 카운트
 */
export const count = async (ctx) => {
    try {
        const count = await Link.countDocuments();

        ctx.res.ok({
            data: count,
            message: 'Success - linkCtrl > count'
        });
    }catch(e) {
        ctx.res.internalServerError({
            message: `Error - linkCtrl > count: ${e.message}`
        });
    }
};

/**
 * @author      minz-logger
 * @date        2019. 11. 27
 * @description 링크 조회
 */
export const one = async (ctx) => {
    let { id } = ctx.params;

    try{
        const link = await Link.findOne({ _id: id });

        ctx.res.ok({
            data: link,
            message: 'Success - linkCtrl > one'
        })
    }catch(e) {
        ctx.res.internalServerError({
            data: { id },
            message: `Error - linkCtrl > one: ${e.message}`
        });
    }
};