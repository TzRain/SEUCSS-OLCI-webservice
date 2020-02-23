const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息
let f=new Array(100).fill(false)
const debug = true

const path = "/user/get/basic"

exports.route = {
	async get({ QQ }) {//GET方法
		console.log("正在运行>>>>>" + path + "<<<<<<");
		console.log(QQ);
		if (!QQ) {
			throw "用户未登陆"
		} else {
			try{
				let userdb = await mongodb('user')
				let user = await userdb.findOne({ QQ })

				let {name,num,point,rank,teamname}=user

				if(!teamname)return {name,num,QQ,point,rank}

				let teamdb =await mongodb("team")
				let team = await teamdb.findOne(teamname)
				let {teampoint,teamrank}=team

				return {name,num,QQ,point,rank,teamname,teampoint,teamrank}
			}catch(e){
				console.log(e);
				throw "查询失败"
			}
		}
	}
}
