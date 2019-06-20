
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
         req.user = userData
        next()
    }catch (e) {
        next(e)
    }
}
module.exports = auth