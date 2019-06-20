// 添加轮播图接口
const swiperModel = require('../model/swriper')
const mongoose = require('mongoose')
async function addSwiper (req, res, next) {
    try {
      const {title, img, bookId, index = 1} = req.body
        const swiper = await swiperModel.create({
            title,
            img,
            bookId:mongoose.Types.ObjectId(bookId),
            index
        })
        res.json({
            code:200,
            msg: '轮播图添加成功'
        })
    }catch (e) {
        next(e)
    }
}
// 获取轮播图
async function getSwiper (req, res, next) {
    try{
        let {pn =1, size= 1} = req.query;
        pn = Number(pn)
        size= Number(size)
        const data = await swiperModel.find({status: 1}).populate({
            path: 'book'
        }).sort({index: 1, _id: -1}).skip((pn-1)*size).limit(size)
        res.json({
            code:200,
            data
        })
    }catch (e) {
        next(e)
    }
}
// 更新轮播图
async function uploadSwiper (req, res, next) {
    try {
     const id = req.params.id; // 取得轮播图ID
        const {title, bookId, status, index} = req.body;
        const updateData = await swiperModel.updateOne({
            _id: mongoose.Types.ObjectId(id)
        },{
            title,
            index,
            status,
            book:  mongoose.Types.ObjectId(bookId)
        })
        res.json({
            code: 200,
            data:updateData,
            msg: '更新轮播图成功'
        })
    }catch (e) {
        next(e)
    }
}
module.exports = {
    addSwiper,
    getSwiper,
    uploadSwiper
}