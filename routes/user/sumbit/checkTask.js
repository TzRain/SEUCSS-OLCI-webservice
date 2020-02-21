const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/checkTask"

exports.route = {
	async get({ QQ, taskNum }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
		let userdb = await mongodb('user')
		let taskdb = await mongodb('task')
		let time = new Date()
		let res="打卡成功"
		try {
			let time = new Date()
			let minute = time.getUTCHours() * 60 + time.getUTCMinutes()
			minute = 30

			let task = await taskdb.findOne({ taskNum })
			let { limt, point } = task
			console.log(task);

			let user = await userdb.findOne({ QQ })
			let { rating, doneList, doneListToday } = user
			console.log(user);

			if (minute < limt[0]) return "还没有开始呢"
			if (limt.slice(-1) < minute) return "今天已经结束咯"

			for (let x in doneListToday) {
				if (doneListToday[x] == taskNum) return "今天以及打过卡咯"
				console.log("num=" + num);
				console.log("tasknum=" + taskNum);
			}

			for (let x in limt) {
				console.log(limt[x])
				if (minute < limt[x]) break
				point--
			}

			rating += point
			await doneListToday.push(taskNum)
			await doneList.push({ taskNum, time })
			await userdb.updateOne({ QQ }, { $set: { doneList, doneListToday, rating } })
			
			res+="获得"+point.toString()+"积分"

		} catch (e) {
			console.log(e)
			throw "打卡时出现错误"
		}
		return res
	}
}