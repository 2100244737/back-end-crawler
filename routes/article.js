const {Router} = require('express')
const router = Router();
const {getArticle} = require('../controller/article')
router.get('/:id', getArticle)
module.exports = router