const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息
let f = new Array(100).fill(false)
const debug = true

const path = "/user/get/basic"

exports.route = {
	async get({ _id }) {//GET方法
		console.log("正在运行>>>>>" + path + "<<<<<<");
		console.log(_id);
		try {
			let userdb = await mongodb('user')
			let user = await userdb.findOne({ _id })
			console.log(user);
			
			let { QQ, name, num, point, rank, teamname } = user

			if (!teamname) return { name, num, _id, point, rank }

			let teamdb = await mongodb("team")
			let team = await teamdb.findOne({teamname})
			let { teampoint, teamrank } = team

			return { name, num, QQ, point, rank, teamname, teampoint, teamrank }
		} catch (e) {
			console.log(e);
			throw "查询失败"
		}
	}
}
