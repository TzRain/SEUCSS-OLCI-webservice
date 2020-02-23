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
	let { QQ, num } = ctx.params
	// userdb.remove()
	if(ctx.path=='/test'){
		await next()
	}else 
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
			let point = 0
			let rank 
			let doneList = []
			let token = hash(num)
			await userdb.insertOne({
				QQ,
				num,
				name,
				teamname,
				point,
				doneList,
				token,
				rank
			})
			ctx.params.token=token
			ctx.params.message="注册成功！"
			await next()
		} else {
			console.log("登陆")
			console.log(userQQ);
			console.log(usernum);
			if (userQQ.token == usernum.token){
				console.log("登陆成功");
				console.log(QQ.token);
				ctx.params.token=userQQ.token
				ctx.params.message="登陆成功！"
				await next()
			}
			else throw "QQ号或者一卡通错误"
		}
	} else {
		console.log(ctx.request.headers);
		let token = ctx.request.headers.authorization
		if (token) {
			let user = await userdb.findOne({ token })
			if (user) {
				let { QQ } = user
				ctx.params.QQ = QQ
				await next()
			}
			else throw "请重新登陆"
		}
		else throw "您尚未登录"
	}
	return "登陆成功"
}
