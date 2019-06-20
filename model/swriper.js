// 轮播图接口模板

const mongoose = require('mongoose')
const swiper = new mongoose.Schema({
     book: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'book',
     },
    index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    title: String,
    img: String
},{versionKey: false, timestamps: {createdAt:'createTime', updatedAt: 'updateTime'}})
module.exports = mongoose.model('swiper',swiper)