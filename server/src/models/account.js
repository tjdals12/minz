const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('../lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
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
    myposts: [Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

Account.statics.findByUsername = function (username) {
    return this.findOne({ 'profile.username': username });
}

Account.statics.findByEmail = function (email) {
    return this.findOne({ email: email }).exec();
}

Account.statics.findByEmailOrUsername = function ({ email, username }) {
    return this.findOne({
        $or: [
            { 'profile.username': username },
            { email: email }
        ]
    }).exec();
}

Account.statics.localRegister = function ({ email, password, username }) {
    const account = new this({
        email,
        password: hash(password),
        profile: {
            username
        }
    })

    return account.save();
}

Account.statics.socialRegister = function ({ email, username, provider, id, accessToken }) {
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
    })

    return account.save();
}

Account.statics.findSocialId = function ({ provider, id }) {
    const key = `social.${provider}.id`;

    return this.findOne({
        [key]: id
    }).exec();
}

Account.methods.validatePassword = function (password) {
    const hashed = hash(password);

    return this.password === hashed;
}

Account.methods.generateToken = function () {
    const payload = {
        _id: this.id,
        profile: this.profile,
        thoughCount: this.thoughCount
    }

    return generateToken(payload);
}

module.exports = mongoose.model('Account', Account);