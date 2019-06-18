// 文章集合
const mongoose = require('mongoose');
const article = mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    titleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'title'
    },
    content: String,
    index: {
        type: Number,
        default:1
    }
}, {versionKey: false, timestamp: {createdAt:'createTime', updatedAt: 'updateTime'}})
module.exports = mongoose.model('article', article)