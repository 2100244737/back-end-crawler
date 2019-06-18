const express = require('express')
const router = express.Router()
const {getBook} = require('../controller/book')
router.post('/', getBook)
module.exports = router