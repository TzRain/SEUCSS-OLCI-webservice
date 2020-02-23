const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId
const crypto = require('crypto');

const axios = require('axios')
const { config } = require('../app')

const hash = value => {
	return Buffer.from(crypto.createHash('md5').update(value).digest()).toString('base64')
}


module.exports = async (ctx, next) => {
	let userdb = await mongodb('user')
	let acctdb = await mongodb('acct')
	let { QQ, num } = ctx.params
	// userdb.remove()
	if (ctx.path=='/user/login') {
		let isQQ = /[1-9]+[0-9]{4,11}/.test(QQ);
		if (!isQQ) throw "无效QQ号"
		let isnum = /213+[0-9]{6}/.test(num);
		if (!isnum) throw "无效一卡通号"

		let userQQ = await userdb.findOne({ QQ })
		let usernum = await userdb.findOne({ num })
		
		if (!userQQ||!usernum) {
			console.log("注册")
			
			let name = ""
			let teamname = ""
			let rating = 0
			let time = new Date()
			let teampoint = 0
			let taskList = []
			let doneList = []
			let doneListToday = []
			let add = new Array(20).fill(0)
			let token = hash(num)
			await userdb.insertOne({
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
				add,
				token
			})
			ctx.params.token=token
			await next()
		} else {
			console.log("登陆")
			console.log(userQQ);
			console.log(usernum);
			if (userQQ.token == usernum.token){
				console.log("登陆成功");
				console.log(QQ.token);
				ctx.params.token=userQQ.token
				await next()
			}
			else throw "QQ号或者一卡通错误"
		}
	} else {
		let token = ctx.request.headers.token
		if (token) {
			let user = await userdb.findOne({ token })
			if (user) {
				let { num, QQ } = user
				ctx.params.QQ = QQ
				ctx.params.num = num
				await next()
			}
			else throw "请重新登陆"
		}
		else throw "您尚未登录"
	}
	return "登陆成功"
}
