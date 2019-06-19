// 文章接口
const articleModel = require('../model/article');
const mongoose = require('mongoose')
async function getArticle (req, res, next) {
    try {
        const {id} = req.params
        const data = await articleModel.find({
                titleId: mongoose.Types.ObjectId(id)
        })
        res.json({
            code: 200,
            data
        })
    }catch (e) {
        next(e)
    }
}
module.exports = {
    getArticle
}