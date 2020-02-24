const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/task/checkTask"

exports.route = {
	async get({ QQ, taskNum }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
		let userdb = await mongodb('user')
		let taskdb = await mongodb('task')
		let time = new Date()
		let res="打卡成功!"
		try {
			let task = await taskdb.findOne({ taskNum })
			let {v} = task
			let user = await userdb.findOne({ QQ })
			let { doneList } = user
			for (let x in doneListToday) {
				if (doneListToday[x] == taskNum) throw "今天已经完成咯"
			}
			let vis=false
			await doneList.push({ taskNum, time ,v ,vis})
			await userdb.updateOne({ QQ }, { $set: { doneList} })
		} catch (e) {
			console.log(e)
			throw e
		}
		return "完成成功"
	}
}