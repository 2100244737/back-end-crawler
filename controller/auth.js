
const jwt = require('jsonwebtoken')
function varifyToken (token) {
    return new  Promise((resolve, reject) =>{
        jwt.verify(token, 'song', (err, data) => {
            if (err){
                reject(err)
                return
            }
            resolve(data.data)
        })
    })
}
async function auth (req, res, next) {
    try {
        const {token} = req.headers || req.body || res.query
        const userData = await varifyToken(token)
         if (userData) {
             req.user = userData
             next()
         }else {
             res.json({
                 code:400,
                 msg: '登录状态已失效，请重新登录'
             })
         }
    }catch (e) {
        res.json({
            code:400,
            msg: '登录状态已失效，请重新登录'
        })
    }
}
module.exports = auth