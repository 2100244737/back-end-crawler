// 分类模块集合
const mongoose = require('mongoose');
const category = mongoose.Schema({
     title: String,
     icon: String,
     books: [{
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'book'
     }],
    index: {
         type: Number,
         default: 1
    },
    status: {
         type: Number,
         default: 1
    }
},{versionKey: false, timestamps: {createdAt:'createTime', updatedAt: 'updateTime'}})
module.exports = mongoose.model('category', category)