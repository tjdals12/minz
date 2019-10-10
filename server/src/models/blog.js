const mongoose = require('mongoose');
const { Schema } = mongoose;

const Blog = new Schema({
    background : String,
    thumbnail : String,
    title : String,
    name : String,
    description : String,
    info : String,
    tags : [String]
})

module.exports = mongoose.model('Blog', Blog);