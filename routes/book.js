const express = require('express')
const router = express.Router()
const {getBook,getBookId, getAllBook } = require('../controller/book')
router.post('/', getBook)
router.get('/allBook', getAllBook )
router.get('/:id', getBookId)
module.exports = router