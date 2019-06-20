const {Router} = require('express')
const router = Router();
const {upload} = require('../controller/upload')
const auth = require('../controller/auth')
router.get('/', auth, upload)
module.exports = router