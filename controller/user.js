// 用户注册接口
const validator = require('validator')
const userModel = require('../model/user')
const smsModel = require('../model/smsCode')
const signUtil = require('../utils/sigToken')
const mongoose = require('mongoose')
async function register (req, res, next) {
    try {
      const {phone, password, code} = req.body
      const phoneStatus = validator.isMobilePhone(phone, 'zh-CN')
      if (phoneStatus){
          const user = await userModel.findOne({
              phone: phone
          })
          if(!user) { //用户未注册
             const smsCode = await smsModel.findOne({code}).sort({_id: -1})
              if(smsCode) {
                let smsCodeData = new Date(smsCode.updateTime)
                  let smsCodeTime = Math.round(smsCodeData.getTime() / 1000)
                  let nowTime = Math.round(Date.now() / 1000);
                  if ((nowTime -smsCodeTime) < 60*5) { // 验证码不在有效期
                      if(code == smsCode.code) {  // 验证码正确
                            await userModel.create({
                                phone,
                                password
                            })
                          res.json({
                              code: 200,
                              msg: '注册成功'
                          })
                      }else { //验证码不正确
                          res.json({
                              code: 200,
                              msg: '验证码不正确'
                          })
                      }
                  }else {
                      res.json({
                          code: 400,
                          msg: '验证码不在有效期'
                      })
                  }
              }
          }else {  // 用户已经注册
              res.json({
                  code: 400,
                  msg: '该用户已经注册'
              })
          }
      }else {
          res.json({
              code: 400,
              msg: '手机号不合法'
          })
      }
    }catch(e){
        next(e)
    }
}
// 用户登录
async function login (req, res, next) {
    try {
        const {phone, password} = req.body;
        if (phone&&password) {
             const user = await userModel.findOne({phone})
            if(user){
                 if(password == user.password) {
                   const token = signUtil({userId: user._id})
                     res.json({
                         code: 200,
                         token
                     })
                 }else {
                     res.json({
                         code: 400,
                         msg: '密码不正确'
                     })
                 }
            }else {
                res.json({
                    code: 400,
                    msg: '该用户不存在'
                })
            }
        }else {
            res.json({
                code: 400,
                msg: '缺少必要参数'
            })
        }

    }catch (e) {
        next(e)
    }
}
// 获取用户信息
async function getUserById (req, res, next) {
    try {
        const userId = req.user.userId
         const userData = await userModel.findById(mongoose.Types.ObjectId(userId)).select('-password')
         res.json({
             code: 200,
             data: userData
         })
    } catch (e) {
        next(e)
    }
}
module.exports = {
    register,
    login,
    getUserById
}