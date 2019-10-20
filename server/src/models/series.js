import config from 'configs';
const { dbUri, dbUser, dbPass } = config;

import { Schema, model, createConnection } from 'mongoose';
import sequence from 'mongoose-sequence';
import leanGetters from 'mongoose-lean-getters';
import DEFINE from 'models/common';

const connection = createConnection(dbUri, { user: dbUser, pass: dbPass });
const AutoIncrement = sequence(connection);

const SeriesSchema = new Schema({
	seq: Number,
	thumbnail: {
		type: String,
		default: 'https://minz-log-image.s3.ap-northeast-2.amazonaws.com/1551000318821.jpg'
	},
	name: String,
	writer: String,
	keyword: {
		type: [ String ],
		default: []
	},
	description: String,
	post: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	dispGb: {
		type: String,
		default: '01'
	},
	finishGb: {
		type: String,
		default: DEFINE.FINISH_GB.REVISION,
		get: DEFINE.finishGbConverter
	},
	publishedDate: {
		type: Date,
		default: DEFINE.dateNow,
		get: DEFINE.dateConverter
	}
});

SeriesSchema.set('toJSON', { getters: true });

SeriesSchema.plugin(AutoIncrement, { inc_field: 'seq' });
SeriesSchema.plugin(leanGetters);

/**
 * @author      minz-logger
 * @date        2019. 10. 20
 * @description 시리즈 생성
 * @param       {Object} params
 */
SeriesSchema.statics.createSeries = function(params) {
	let { thumbnail, name, keyword, description, writer } = params;

	const series = new this({ thumbnail, name, keyword, description, writer });

	return series.save();
};

export default model('Series', SeriesSchema);
