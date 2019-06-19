// 文章集合模块
const mongoose = require('mongoose');
const a = '123'
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