const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/task/checkTask"

exports.route = {
	async get({ _id, taskNum }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
		let userdb = await mongodb('user')
		let taskdb = await mongodb('task')
		let time = new Date()
		let res="打卡成功!"
		try {
			let task = await taskdb.findOne({ taskNum })
			let {  v } = task

			let user = await userdb.findOne({ _id })
			let { doneList } = user

			for (let x in doneListToday) {
				if (doneListToday[x] == taskNum) return "今天以及打过卡咯"
			}

			await doneList.push({ taskNum, time ,v})
			
			await userdb.updateOne({ _id }, { $set: { doneList} })
			

		} catch (e) {
			console.log(e)
			throw "打卡时出现错误"
		}
		return "打卡成功"
	}
}