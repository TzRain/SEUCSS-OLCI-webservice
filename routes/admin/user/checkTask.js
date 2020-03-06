const mongodb = require('../../../database/mongodb')
const tasks = require('../../../static/tasks')

const newtime = () => new Date((new Date).valueOf() + 60* 60 * 1000*8)
const totalDay = (time)=>Math.ceil(( time - new Date(newtime().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
	async get({ QQ, taskNum, pre}) {
		if(!pre)pre=false
		try {
			if(!taskNum)throw "没有输入题号"
			console.log(QQ);
			let num = Number(taskNum)
			let time = newtime()
			if(pre) time=new Date((new Date).valueOf() + 60* 60 * 1000*8-60* 60 * 1000*24)
			console.log(time);
			let { val } = tasks[num]
			if(!val)throw "错误题号"
			let userdb = await mongodb('user')
			let user = await userdb.findOne({ QQ })
			if(!user)return "没有该QQ"
			let { teamname,doneList,point} = user

			let v=0
			let teamdb = await mongodb('team')
			
			if(teamname){
				team=await teamdb.findOne({teamname})
				v=team.v
			}
			
			for (let x in doneList) {
				if (totalDay(doneList[x].time) == totalDay(time)) {
					console.log(doneList[x].time);
					console.log("day:"+totalDay(doneList[x].time));
					console.log(time);
					console.log("day:"+totalDay(time));
					if (doneList[x].taskNum == taskNum)throw "今天已经打过卡咯"
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
			if(teamname){
				await teamdb.updateOne({ teamname }, { $set: { v } })
			}
			point+=val
			console.log(point);
			await doneList.push({ taskNum, time, v:val})
			
			await userdb.updateOne({ QQ }, { $set: { doneList ,point} })
		} catch (e) {
			console.log(e);
			throw e
		}
		return "打卡成功"
	}
}