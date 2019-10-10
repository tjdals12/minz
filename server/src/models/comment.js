const mongoose =  require('mongoose');
const { Schema } = mongoose;

const Comment = Schema({
    content : String,
    postId : Schema.Types.ObjectId,
    writer : String,
    publishedDate : {
        type : Date,
        default : new Date()
    }
})

module.exports = mongoose.model('Comment', Comment);