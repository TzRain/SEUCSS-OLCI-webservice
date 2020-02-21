const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

exports.route = {
    async get({id}) {//GET方法
      let _id=ObjectId(id)
      if (!id) {
        throw 401
      }else {
        let OLCI = await mongodb('OLCI')
        let res
        try{
          res=await OLCI.findOne({_id})
        }catch(e){
          console.log(e)
          throw "没有记录"
        }
        return res
      }
    }
  }