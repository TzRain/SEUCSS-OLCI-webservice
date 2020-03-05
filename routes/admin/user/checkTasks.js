const mongodb = require('../../../database/mongodb')
const tasks = require('../../../static/tasks')

const newtime = () => new Date((new Date).valueOf() + 60* 60 * 1000*8)
const totalDay = (time)=>Math.ceil(( time - new Date(newtime().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
	async post({QQ,taskNums}) {
		try {
			if(!QQ)throw "没有输出QQ"
			let time = newtime()
			let userdb = await mongodb('user')
			let user = await userdb.findOne({ QQ })
			console.log(user);
			let { teamname,doneList,point} = user
			let teamdb = await mongodb('team')
			let v
			if(teamname){
				let team=await teamdb.findOne({teamname})
				v=team.v
			}
			for(t in taskNums){
				let num = taskNums[t]
				let taskNum=num
				console.log(time);
				let { val } = tasks[num]
				for (let x in doneList) {
					if (totalDay(doneList[x].time) == totalDay(time)) {
						console.log(doneList[x].time);
						console.log("day:"+totalDay(doneList[x].time));
						console.log(time);
						console.log("day:"+totalDay(time));
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
				point+=val
				await doneList.push({ taskNum, time, v:val})
			}
			if(teamname){
				await teamdb.updateOne({ teamname }, { $set: { v } })
			}
			await userdb.updateOne({ QQ }, { $set: { doneList ,point} })
		} catch (e) {
			console.log(e);
			throw e
		}
		return "打卡成功"
	}
}