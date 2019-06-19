var express = require('express');
var router = express.Router();
const bookRouter = require('./book')
const categoryRouter = require('./category')
router.use('/book', bookRouter) // 爬取一本书
router.use('/category', categoryRouter) // 添加和获取分类
module.exports = router;
