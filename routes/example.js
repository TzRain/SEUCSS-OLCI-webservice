const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId


exports.route = {
  /**
   * 该接口名称
   * @param {type}    paramnew_name Description  是否必须
   * 例子：
   * @param {String}  cardnum   一卡通号       √
   * 
   */
  async get({ params }) {//GET方法
    
    if (!params) {
      
      throw '没有必须字段'//记得非法throw要throw出具体错误
    }else {
      
      let OLCI = await mongodb('OLCI')
      
      let new_name="jack"
      let res
      try{
        await OLCI.insertOne({new_name})
        res=await OLCI.findOne({new_name})

      }catch(e){
        console.log(e)
        throw "没有记录呢"
      }
      //这里的res 会存在于返回响应的 result字段 里
      return res
    }
  }
}