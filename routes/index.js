var express = require('express');
var router = express.Router();
const bookRouter = require('./book')
router.use('/book', bookRouter)
module.exports = router;
