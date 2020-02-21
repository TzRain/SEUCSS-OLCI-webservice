const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

//获取用户基本信息

exports.route = {
    async get({QQ}) {//GET方法
      if (!QQ) {
        throw "用户未登陆"
      }else {
        let OLCI = await mongodb('user')
        let res
        try{
          res=await OLCI.findOne({QQ})
        }catch(e){
          console.log(e)
          throw "没有该账号的记录"
        }
        return res
      }
    }
  }