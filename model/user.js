// 用户登录模板
const mongoose = require('mongoose');
const user = mongoose.Schema({
    nickname: String,
    avatar: {
        type: String,
        default: 'http://img0.imgtn.bdimg.com/it/u=3610302915,3877528639&fm=26&gp=0.jpg'
    },
    phone: {
        type: Number,
        unique: true
    },
    password: String
},{versionKey: false, timestamps: {createdAt:'createTime', updatedAt: 'updateTime'}})
module.exports = mongoose.model('user', user)