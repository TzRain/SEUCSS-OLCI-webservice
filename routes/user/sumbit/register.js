const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/register"

const hash = (QQ,num) => {
	return ((Number(QQ)*Number(num))*233333333+Number(QQ)*23333+Number(num)).toString('base64')
}

exports.route = {
	async get({num, QQ, name, teamname = "" }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");

		let user = await mongodb('user')
		let pre = await user.findOne({ QQ })

		if (QQ) {
			var isnum = /[1-9]+[0-9]{4,11}/.test(QQ);
			if (!isnum) throw "无效QQ号"
		}
		if (!num || !name || !QQ) {
			throw "存在未填信息"
		} else if (pre) {
			console.log(pre);
			throw "这个QQ已经被注册了"
		} else {
			try {
				let rating = 0
				let time = new Date()
				let teampoint = 0
				let taskList = []
				let doneList = []
				let doneListToday = []
				let add = new Array(20).fill(0)
				let token = hash(QQ,num)
				await user.insertOne({
					num,
					QQ, 
					name,
					teamname,
					rating,
					teampoint,
					taskList,
					doneList,
					time,
					doneListToday,
					add
				})
			} catch (e) {
				console.log(e)
				throw "注册失败"
			}
			return "注册成功"
		}
	}
}