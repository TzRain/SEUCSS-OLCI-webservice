const mongodb = require('../../../database/mongodb')
const tasks = require('../../../static/tasks')

const newtime = () => new Date((new Date).valueOf() + 60 * 60 * 1000 * 8)
const totalDay = (time) => Math.ceil((time - new Date(newtime().getFullYear().toString())) / (24 * 60 * 60 * 1000)) + 1;

exports.route = {
	async get({ _id, taskNum }) {
		let num = Number(taskNum)
		let time = newtime()
		let minute = time.getUTCHours() * 60 + time.getUTCMinutes()

		let { limt, val } = tasks[num]

		let userdb = await mongodb('user')
		let user = await userdb.findOne({ _id })
		let { neamname, doneList, point } = user

		let teamdb = await mongodb('team')
		let team = await teamdb.find({ neamname })
		let { v } = team

		if (minute < limt[0]) throw "还没有开始呢"
		if (limt.slice(-1) < minute) throw "今天已经结束咯"
		for (let x in doneList) {
			if (doneList[x].time.getDate() == time.getDate()) {
				if (doneList[x].taskNum == taskNum) throw "今天已经打过卡咯"
			}
		}
		//计算分数
		for (let x in limt) {
			if (minute < limt[x]) break
			val--
		}
		let f=false
		if(tasks[num].add==true)f=true
		if (f) {
			f = false
			for (let x in doneList) {
				if (totalDay(doneList[x].time) + 1 == totalDay(time)) {
					if (doneList[x].taskNum == taskNum) {
						val++
						f = true
						break
					}
				}
			}
		}
		if (f) {
			for (let x in doneList) {
				if (totalDay(doneList[x].time) + 2 == totalDay(time)) {
					if (doneList[x].taskNum == taskNum) {
						val++
						break
					}
				}
			}
		}
		v += val
		await teamdb.updateOne({ teamname }, { $set: { v } })
		point += val
		await doneList.push({ taskNum, time, v:val })
		await userdb.updateOne({ _id }, { $set: { doneList, point } })
		return "打卡成功"
	}
}