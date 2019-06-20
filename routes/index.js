var express = require('express');
var router = express.Router();
const bookRouter = require('./book')
const categoryRouter = require('./category')
const titleRouter = require('./title')
const articleRouter = require('./article')
const userRouter = require('./users')
const smsCodeRouter = require('./smsCode')
const uploadRouter = require('./upload')
const swiperRouter = require('./swiper')
const collectionsRoutes = require('./collection');
router.use('/book', bookRouter) // 爬取一本书
router.use('/category', categoryRouter) // 添加和获取分类
router.use('/title', titleRouter) // 获取目录
router.use('/article', articleRouter) // 获取文章
router.use('/user', userRouter) // 用户注册接口
router.use('/smsCode', smsCodeRouter) //发送短信
router.use('/uploadToken', uploadRouter) //发送图片
router.use('/swiper', swiperRouter) //添加轮播图
router.use('/collection', collectionsRoutes); //添加收藏

module.exports = router;
