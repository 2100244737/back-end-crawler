var express = require('express');
var router = express.Router();
const {register} = require('../controller/user')

router.post('/register', register);

module.exports = router;
