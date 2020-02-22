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
			let { limt, point } = task

			let user = await userdb.findOne({ QQ })
			let { rating, doneList, doneListToday } = user

			for (let x in doneListToday) {
				if (doneListToday[x] == taskNum) return "今天以及打过卡咯"
			}

			rating += point
			await doneListToday.push(taskNum)
			await doneList.push({ taskNum, time ,point})
			
			await userdb.updateOne({ QQ }, { $set: { doneList, doneListToday, rating } })
			
			res+=QQ+"获得"+point.toString()+"积分"

		} catch (e) {
			console.log(e)
			throw "打卡时出现错误"
		}
		return res
	}
}