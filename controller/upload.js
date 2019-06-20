const uploadUtils = require('../utils/upload')
async function upload (req, res, next) {
    try {
        res.json({
            code: 200,
            data: {
                token: uploadUtils
            }
        })
    }catch (e) {
        next(e)
    }
}
module.exports = {
    upload
}