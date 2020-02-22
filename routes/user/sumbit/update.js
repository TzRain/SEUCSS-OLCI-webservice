const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/update"

exports.route = {
	async get({ QQ, name = "" }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
		let userdb = await mongodb('user')
		try {
			if(name){
				console.log(name);
				await userdb.updateOne({QQ},{ $set: {name} })
			}
		} catch (e) {
			console.log(e)
			throw "更改失败"
		}
		return "更改成功"
	}
}