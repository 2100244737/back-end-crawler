// 爬取一本书
const rq = require('request-promise')
const cheerio = require('cheerio')
const bookModel = require('../model/book')
const titleModel = require('../model/title')
const articleModel = require('../model/article')
async function getBook (req, res, next) {
    try {
        const {img,title,  url, author} = req.body


        // 第一步： 请求书籍网址
        // 第二步： 拿到书的描述， 书的标题，在book集合中创建一条书籍记录
        // 第三步： 拿到目录，根据目录链接，去请求每一篇文章的内容，存储到目录和文章中，
        // 第四部： 爬取完成
        const data = await rq.get(url)
        const $ = cheerio.load(data)

        let desc
         desc = $('meta[description]').attr('content')
        const book = await bookModel.create({
            title,
            img,
            author,
            desc
        })
        let baseUrl
        let titlesArrUrl = []
         let titleText = []
        let titleArr = url.split('/') // 数组转字符串
        titleArr.pop(); // 去除最后一项
        baseUrl = titleArr.join('/')+ '/' // 数组转字符串
        const titleEle = $('.catalog a')
        titleEle.each((index, item) => { // 等到所有的目录网址
            titlesArrUrl.push(baseUrl + $(item).attr('href'))
            titleText.push($(item).text())
        })
        for (let i = 0; i < titlesArrUrl.length; i++) {
            const item = titlesArrUrl[i]
            const index = i
            const articleData = await rq.get(item)
            const $ = cheerio.load(articleData)
            const content = $('.content').text()
            const title = await titleModel.create({
               bookId: book._id,
                title: titleText[index],
                index,
                total: titlesArrUrl.length
            })
            const article = await articleModel.create({
                bookId: book._id,
                titleId: title._id,
                index,
                content,
            })
        }
        res.json({
            code: 200,
            msg: '爬取成功'
        })
    }catch (e) {
        next(e)
    }
}
// 获得一本书
async function getBookId (req, res, next) {
    try {
        const {id} = req.params
        const data = await bookModel.findById(id)
        res.json({
            code: 200,
            data
        })
    }catch (e) {
        next(e)
    }
}
async function getAllBook (req, res, next ) {
    try{
        const data = await bookModel.find()
        res.json({
            code: 200,
            data
        })
    } catch (e) {
        next(e)
    }
}
module.exports = {
    getBook,
    getBookId,
    getAllBook
}