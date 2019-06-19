 // 短信服务
const SMSClient = require('@alicloud/sms-sdk');
 const accessKeyId = 'LTAIjMAmj2YoC5zd';
 const secretAccessKey = 'Z8YLAeZOgqk4n58HU5551TLKJCVs1S';
 // 初始化smsClient
 let smsClient = new SMSClient({accessKeyId, secretAccessKey})
 // 发送短信
 // smsClient.sendSMS({
 //     PhoneNumbers: '18339158821',
 //   SignName: '滴滴工程',
 //  TemplateCode: 'SMS_128645465',
 //  TemplateParam: '{"code": "12345"}'
 // }).then(function (res) {
 //    let {Code, SmsSendDetailDTOs} = res
 //    if (Code === 'OK') {
 //     console.log(SmsSendDetailDTOs);
 //    }
 // }, function (err) {
 //  console.log(err);
 // })
module.exports = function (phone, code) {
  return new Promise((resolve, reject) => {
   smsClient.sendSMS({
    PhoneNumbers: phone,
    SignName: '滴滴工程',
    TemplateCode: 'SMS_128645465',
    TemplateParam: `{"code": "${code}"}`
   }).then(function (res) {
    let {Code} = res
    resolve(res)
    if (Code === 'OK') {
     console.log(res);
    }
   }, function (err) {
    reject(err)
    console.log(err);
   })
  })
}