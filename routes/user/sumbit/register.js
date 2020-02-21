const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path="/user/sumbit/register"

exports.route = {
    async get({QQ,name,teamname=""}) {
			console.log("正在访问>>>>>>>>>"+path+"<<<<<<<<<<");
			
			let user = await mongodb('user') 
			let pre=await user.findOne({QQ})
			
			if(QQ){
				var isnum = /[1-9]+[0-9]{4,11}/.test(QQ);
				if(!isnum)throw "无效QQ号"
			}
      if (!name||!QQ) {
        throw "存在未填信息"
      }else if(pre){
				console.log(pre);
				throw "改QQ已经被注册"
			}else{
				try{
						let rating=0
						let card=new Array()
						let taskList=new Array()
						let doneList=new Array()
						await user.insertOne({QQ,name,teamname,rating,card,taskList,doneList})
        }catch(e){
          console.log(e)
          throw "注册失败"
        }
				return "注册成功"
      }
    }
  }