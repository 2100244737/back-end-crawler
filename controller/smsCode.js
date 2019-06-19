// 发送验证码
const sms =require('../utils/smsUtis')
const smsModel = require('../model/smsCode')
const userModel = require('../model/user')
async function sendCode (req, res, next) {
    try {
      const {phone} = req.body
        const user = await userModel.findOne({
            phone
        })
        if (!user) { // 用户没注册
            let sixStr = '';
            for(let i = 0; i<6; i++) {
                sixStr += Math.floor(Math.random() * 10) + ''
            }
            const smsRes = await sms(phone, sixStr)
            if(smsRes.Code == 'OK') { // 短信发送成功
                await smsModel.create({
                    phone,
                    code: sixStr
                })
                res.json({
                    code: 200,
                    msg: '短息发送成功'
                })
            }else { // 短信发送失败
                res.json({
                    code: 500,
                    msg: smsRes.Code
                })
            }
        }else {
            res.json({
                code: 400,
                msg: '该用户已经注册过了'
            })
        }
    }catch (e) {
        next(e)
    }
}
module.exports = {
    sendCode
}