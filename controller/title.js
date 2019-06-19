// 目录接口
const titleModel = require('../model/title')
const mongoose = require('mongoose')
async function getTitle (req, res, next) {
    try{
        const {bookId} = req.query;
        const data = await titleModel.find({
            bookId: mongoose.Types.ObjectId(bookId)
        })
        res.json({
            code: 200,
            data
        })
    } catch (e) {
        next(e)
    }
}
module.exports = {
    getTitle
}