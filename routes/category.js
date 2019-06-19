const express = require('express');
const router = express.Router();
const {addCategory, getCategory,addBookCategory, getBookCategory} = require('../controller/category')
router.post('/', addCategory) //添加分类
router.get('/', getCategory) //获取分类
router.post('/book', addBookCategory) //往分类添加一本书id
router.get('/book', getBookCategory) //往分类添加一本书籍
module.exports = router