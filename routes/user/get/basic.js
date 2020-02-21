const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
let donetype = new Array()
//获取用户基本信息

exports.route = {
	async get({ QQ }) {//GET方法
		if (!QQ) {
			throw "用户未登陆"
		} else {
			let userdb = await mongodb('user')
			let taskdb = await mongodb('task')
			let res
			try {
				user = await userdb.findOne({ QQ })
				//处理每日更新数据
				let time = new Date()
				let { pre_time } = user
				if (pre_time.substr(0, 9) != time.substr(0, 9)) {
					let {donelistToday}=user
					donetype = []
					for (taskNum in donelistToday){
						let {type} = taskdb.findOne({taskNum})
						donetype.push(type)
					}
					for(let i=0;i<20;i++){
						let flag=0
						for(let type in donetype){
							if(type==i)flag=1
						}
						if(flag)add[i]=add[i]+1
						else add[i]=0
					}	
					donelistToday = []
					await userdb.update({ QQ }, { $set: { doneListToday } })
				}
				await userdb.update({ QQ }, { $set: { time } })
			} catch (e) {
				console.log(e)
				throw "没有该账号的记录"
			}
			return user
		}
	}
}