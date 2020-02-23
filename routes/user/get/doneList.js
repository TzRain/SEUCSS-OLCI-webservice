const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息
let f = new Array(100).fill(false)
const debug = true

const path = "/user/get/doneList"

exports.route = {
	async get({ _id }) {//GET方法
		console.log("正在运行>>>>>" + path + "<<<<<<");
		console.log(_id);
		try {
			let userdb = await mongodb('user')
			let user = await userdb.findOne({ _id })
			return user.doneList
		} catch (e) {
			console.log(e);
			throw e
		}
	}
}
