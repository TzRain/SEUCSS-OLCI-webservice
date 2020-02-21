const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息

const debug = true

const path = "/user/get/basic"

exports.route = {
	async get({ QQ }) {//GET方法
		console.log("正在运行>>>>>" + path + "<<<<<<");
		if (!QQ) {
			throw "用户未登陆"
		} else {
			let userdb = await mongodb('user')
			let taskdb = await mongodb('task')
			let res
			try {
				user = await userdb.findOne({ QQ })
				//处理每日更新数据
				let newTime = new Date()

				let { time, add } = user

				if (time.getDate() != newTime.getDate() || debug) {
					let { doneListToday } = user
					doneListToday = []
					await userdb.update({ QQ }, { $set: { doneListToday } })
				}
				time = newTime
				await userdb.update({ QQ }, { $set: { time } })
			} catch (e) {
				console.log(e)
				throw "查询失败"
			}
			return user
		}
	}
}