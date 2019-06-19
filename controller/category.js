// 添加分类
const categoryModel = require('../model/category')
const mongoose = require('mongoose')
const bookModel = require('../model/book')

async function addCategory(req, res, next) {
    try {
        const {title, icon} = req.body
        await categoryModel.create({
            title,
            icon
        })
        res.json({
            code: '200',
            msg: '添加分类成功'
        })
    } catch (e) {
        next(e)
    }
}

// 获取分类
async function getCategory(req, res, next) {
    try {
        const data = await categoryModel.find().sort({id: -1})
        res.json({
            code: 200,
            data
        })
    } catch (e) {
        next(e)
    }
}

// 往分类添加一本书Id
async function addBookCategory(req, res, next) {
    try {
        const {categoryId, bookId} = req.body
        const category = await categoryModel.findOne({
            _id: mongoose.Types.ObjectId(categoryId)
        })
        const book = await bookModel.findOne({
            _id: mongoose.Types.ObjectId(bookId)
        })
        if (book) {
            await category.books.push(book._id)
            await category.save()
            res.json({
                code: 200,
                msg: '分类添加成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '添加的书籍不存在'
            })
        }

    } catch (e) {
        next(e)
    }
}
// 通过分类添加书籍
async function getBookCategory (req, res, next) {
    try {
       const data = await categoryModel.find().sort({id: -1}).populate('books')
        res.json({
            code: 200,
            data
        })
    }catch (e) {
        next(e)
    }
}
module.exports = {
    addCategory,
    getCategory,
    addBookCategory,
    getBookCategory
}