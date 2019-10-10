import Blog from 'models/blog';

export const getInfo = async (ctx) => {
	const user = 'Minz-logger';

	try {
		const blog = await Blog.findOne({ user: user });
		ctx.body = blog;
	} catch (e) {
		ctx.throw(500, e);
	}
};

export const edit = async (ctx) => {
	const { user } = ctx.request;

	if (!user) {
		ctx.status = 403;
		return;
	}

	const data = {};

	const { background, thumbnail, title, name, description, info, tags } = ctx.request.body;

	if (background !== null) {
		data.background = background;
	}

	if (background !== null) {
		data.thumbnail = thumbnail;
	}

	if (title !== null) {
		data.title = title;
	}

	if (name !== null) {
		data.name = name;
	}

	if (description !== null) {
		data.description = description;
	}

	if (info !== '') {
		data.info = info;
	}

	if (tags.length !== 0 || tags.length >= 1) {
		data.tags = tags;
	}

	try {
		const result = await Blog.findOneAndUpdate({ user: user.profile.username }, data, {
			new: true
		});

		ctx.body = result;
	} catch (e) {
		ctx.throw(500, e);
	}
};
