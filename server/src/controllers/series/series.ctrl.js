import Series from 'models/series';
import Post from 'models/post';
import Account from 'models/account';

export const create = async (ctx) => {
	const { thumb: thumbnail, name, keyword, description } = ctx.request.body;

	const user = ctx.request.user;

	const userInfo = await Account.findByUsername(user.profile.username);
	const { username: writer } = userInfo.profile;

	const series = new Series({ thumbnail, name, keyword, description, writer });

	try {
		await series.save();

		ctx.body = series;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const update = async (ctx) => {
	const { seq } = ctx.params;

	const user = ctx.request.user;

	if (!user) {
		ctx.status = 403;
		return;
	}

	const userInfo = await Account.findByUsername(user.profile.username);
	const { username: writer } = userInfo.profile;

	try {
		const updateSeries = await Series.findOneAndUpdate({ seq: seq, writer: writer }, ctx.request.body, {
			new: true
		});

		const inSeries = await Post.find({ _id: { $in: updateSeries.post } }).sort({ 'series.subSeq': -1 }).exec();

		ctx.body = {
			series: updateSeries,
			inSeries: inSeries
		};
	} catch (e) {
		ctx.throw(500, e);
	}
};

export const list = async (ctx) => {
	const page = parseInt(ctx.query.page || 1, 10);

	if (page < 1) {
		ctx.status = 400;
		return;
	}

	try {
		const series = await Series.find({ dispGb: '01' }).sort({ seq: -1 }).lean().limit(5 * page).exec();

		const seriesCount = await Series.find({ dispGb: '01' }).count().exec();

		const limitBodyLength = (s) => ({
			...s,
			description: s.description.length < 125 ? s.description : `${s.description.slice(0, 125)}...`
		});

		ctx.set('last-page', Math.ceil(seriesCount / 5));
		ctx.body = series.map(limitBodyLength);
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const count = async (ctx) => {
	try {
		const count = await Series.find({ dispGb: '01' }).count().exec();

		ctx.body = count;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const read = async (ctx) => {
	const { seq } = ctx.params;

	try {
		const series = await Series.findOne({ seq: seq }).exec();

		const inSeries = await Post.find({ _id: { $in: series.post } }).sort({ 'series.subSeq': -1 }).exec();

		if (!series) {
			ctx.status = 404;
			return;
		}

		ctx.body = {
			series: series,
			inSeries: inSeries
		};
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const hide = async (ctx) => {
	const { seq } = ctx.params;

	try {
		const series = await Series.findOneAndUpdate(
			{ seq: seq },
			{ dispGb: '02' },
			{
				new: true
			}
		);
		1;
		if (!series) {
			ctx.status = 404;
			return;
		}

		ctx.body = series;
	} catch (e) {
		ctx.throw(e, 500);
	}
};

export const write = async (ctx) => {
	const { seq } = ctx.params;

	const { title, body, tags } = ctx.request.body;

	const user = ctx.request.user;

	const userInfo = await Account.findByUsername(user.profile.username);
	const { id } = userInfo;
	const { username: writer } = userInfo.profile;

	try {
		const curSubSeq = await Post.findOne({ 'series.seq': seq }, { _id: false, 'series.subSeq': true })
			.sort({ 'series.subSeq': -1 })
			.limit(1)
			.exec();

		let subSeq = null;
		if (curSubSeq) {
			subSeq = curSubSeq.series.subSeq;
		} else {
			subSeq = 0;
		}

		const post = new Post({
			writer,
			title,
			body,
			tags,
			series: {
				seq: seq,
				subSeq: subSeq + 1
			}
		});

		const { id: postId } = await post.save();

		const postInSeries = await Series.findOneAndUpdate(
			{ seq: seq },
			{ $push: { post: postId } },
			{
				new: true
			}
		);

		const updateObj = {
			$push: { myposts: postId },
			$inc: { thoughCount: 1 }
		};

		await Account.findByIdAndUpdate({ _id: id }, updateObj);

		ctx.body = {
			_id: postId,
			series: postInSeries
		};
	} catch (e) {
		ctx.throw(e, 500);
	}
};
