const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

exports.route = {
    async get({QQ,name,teamname=""}) {//GET方法
			let OLCI = await mongodb('user') 
			let pre=await OLCI.findOne({QQ})
      if (!name||!QQ) {
        throw "存在未填信息"
      }else if(pre){
				console.log(pre);
				throw "改QQ已经被注册"
			}else{
				try{
            await OLCI.insertOne({QQ,name,teamname})
        }catch(e){
          console.log(e)
          throw 400
        }
        return "success"
      }
    }
  }