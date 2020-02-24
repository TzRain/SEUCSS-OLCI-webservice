const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/checkTask"

let totalDay = (time)=>Math.ceil(( time - new Date(new Date().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
	async get({ _id, taskNum }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
		try {
			console.log(taskNum);
			
			let time = new Date((new Date).valueOf() + 60* 60 * 1000*8)
			let minute = time.getUTCHours() * 60 + time.getUTCMinutes()
			minute =605

			let taskdb = await mongodb('task')
			let task = await taskdb.findOne({ taskNum })
			
			let { limt, v } = task

			let userdb = await mongodb('user')
			let user = await userdb.findOne({ _id })
			let { doneList } = user

			if (minute < limt[0]) throw "还没有开始呢"
			if (limt.slice(-1) < minute) throw "今天已经结束咯"

			for (let x in doneList) {
				if(doneList[x].time.getDate()==time.getDate()){
					if(doneList[x].taskNum == taskNum) throw "今天已经打过卡咯"
				}
			}
			for (let x in limt) {
				if (minute < limt[x]) break
				v--
			}
			let f=false
			for (let x in doneList) {
				if(totalDay(doneList[x].time)+1==totalDay(time)){
					if(doneList[x].taskNum == taskNum){
						v++
						f=true
						break
					}
				}
			}
			if(f){
				for (let x in doneList) {
					if(totalDay(doneList[x].time)+2==totalDay(time)){
						if(doneList[x].taskNum == taskNum){
							v++
							break
						}
					}
				}
			}
			let vis=false
			await doneList.push({ taskNum, time ,v ,vis})
			await userdb.updateOne({ _id }, { $set: { doneList } })
		} catch (e) {
			throw e
		}
		return "打卡成功"
	}
}