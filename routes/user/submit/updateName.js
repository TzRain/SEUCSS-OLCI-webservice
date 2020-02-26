const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/updateName"

exports.route = {
	async get({ _id, newname = "" }) {
		console.log();
		
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
		let userdb = await mongodb('user')
		try {
			if(newname){
				let name=newname
				await userdb.updateOne({_id},{ $set: {name} })
			}else{
				throw '名字不能为空'	
			}
		} catch (e) {
			console.log(e)
			throw e
		}
		return "更改成功"
	}
}