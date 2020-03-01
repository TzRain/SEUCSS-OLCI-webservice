const mongodb = require('../../../database/mongodb')
const tasks = require('../../../static/tasks')

const newtime = () => new Date((new Date).valueOf() + 60* 60 * 1000*8)
const totalDay = (time)=>Math.ceil(( time - new Date(newtime().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
	async get({ QQ, taskNum }) {

		try {
			console.log(taskNum);
			console.log(QQ);
			let num = Number(taskNum)
			let time = newtime()
			let { val } = tasks[num]

			let userdb = await mongodb('user')
			let user = await userdb.findOne({ QQ })
			let { teamname,doneList,point} = user

			let teamdb = await mongodb('team')
			let team = await teamdb.find({teamname})
			let {v}=team

			for (let x in doneList) {
				if (doneList[x].time.getDate() == time.getDate()) {
					if (doneList[x].taskNum == taskNum) throw "今天已经打过卡咯"
				}
			}

			let f = false
			if(tasks[num].add==true)f=true
			if(f){
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
			v+=val
			await teamdb.updateOne({ teamname }, { $set: { v } })
			point+=val
			await doneList.push({ taskNum, time, v:val})
			await userdb.updateOne({ QQ }, { $set: { doneList ,point} })
		} catch (e) {
			console.log(e);
			throw e
		}
		return "打卡成功"
	}
}