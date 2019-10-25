import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import { generateToken } from 'lib/token';

function hash(password) {
	return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

/**
 * @author 		minz-logger
 * @date 		2019. 09. 09
 * @description 회원 스키마
 */
const AccountSchema = new Schema({
	profile: {
		username: String,
		thumbnail: {
			type: String,
			default: 'http://minz-log-image.s3-ap-northeast-2.amazonaws.com/default_profile.png'
		}
	},
	email: String,
	social: {
		facebook: {
			id: String,
			accessToken: String
		},
		google: {
			id: String,
			accessToken: String
		}
	},
	password: String,
	thoughCount: {
		type: Number,
		default: 0
	},
	myposts: [ Schema.Types.ObjectId ],
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

AccountSchema.statics.findByUsername = function(username) {
	return this.findOne({ 'profile.username': username });
};

AccountSchema.statics.findByEmail = function(email) {
	return this.findOne({ email: email });
};

AccountSchema.statics.findByEmailOrUsername = async function({ email, username }) {
	return this.findOne({
		$or: [ { 'profile.username': username }, { email: email } ]
	});
};

AccountSchema.statics.localRegister = function({ email, password, username }) {
	const account = new this({
		email,
		password: hash(password),
		profile: {
			username
		}
	});

	return account.save();
};

AccountSchema.statics.socialRegister = function({ email, username, provider, id, accessToken }) {
	const key = `social.${provider}`;

	const account = new this({
		email,
		[key]: {
			id,
			accessToken
		},
		profile: {
			username
		}
	});

	return account.save();
};

AccountSchema.statics.findSocialId = function({ provider, id }) {
	const key = `social.${provider}.id`;

	return this.findOne({
		[key]: id
	}).exec();
};

AccountSchema.methods.validatePassword = function(password) {
	const hashed = hash(password);

	return this.password === hashed;
};

AccountSchema.methods.generateToken = function() {
	const payload = {
		_id: this.id,
		profile: this.profile,
		thoughCount: this.thoughCount
	};

	return generateToken(payload);
};

export default model('Account', AccountSchema);
