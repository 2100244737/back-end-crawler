const {Router} = require('express')
const router = Router();
const {addSwiper,getSwiper, uploadSwiper} = require('../controller/swiper')
router.post('/', addSwiper)
router.get('/', getSwiper)
router.patch('/:id', uploadSwiper)
module.exports = router