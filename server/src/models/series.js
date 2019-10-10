const mongoose = require('mongoose');
const { Schema } = mongoose;
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/blog");
const autoInc = require('mongoose-auto-increment');
autoInc.initialize(connection);

const Series = new Schema({
    seq : Number,
    thumbnail : String,
    name : String,
    writer : String,
    keyword : [String],
    description : String,
    post : [Schema.Types.ObjectId],
    dispGb : {
        type : String,
        default : "01"
    },
    finishGb : {
        type : String,
        default : "01"
    },
    publishedDate : {
        type : Date,
        default : new Date()
    }
})

Series.plugin(autoInc.plugin, {
    model : 'Series',
    field : 'seq',
    startAt : 0,
    incrementBy : 1
})


module.exports = mongoose.model('Series', Series);