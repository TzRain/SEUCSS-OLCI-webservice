const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId
const crypto = require('crypto');

const hash = value => {
	return Buffer.from(crypto.createHash('md5').update(value).digest()).toString('base64')
}

module.exports = async (ctx, next) => {
	let userdb = await mongodb('user')
	// console.log("输出params")
	// console.log(ctx.params);
	// console.log("输出path")
	// console.log(ctx.path.substr(0,6))
	let { QQ, num } = ctx.params
	if(ctx.path.substr(0,6)=='/admin'){
		await next()	
	}
	else if(ctx.path=='/test'){
		await next()
	}
	else if(ctx.path=='/user/login') {
		console.log(QQ);
		console.log(num);
		let isQQ = /[1-9]+[0-9]{4,11}/.test(QQ);
		if (!isQQ) throw "无效QQ号"
		let isnum = /213+[0-9]{6}/.test(num);
		if (!isnum) throw "无效一卡通号"
		let userQQ = await userdb.findOne({ QQ })
		let usernum = await userdb.findOne({ num })
		
		if (!userQQ||!usernum) {
			console.log("注册")
			let name = num
			let teamname = ""
			let point = 0
			let rank = -1
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
		} else {
			console.log("登陆")
			if (userQQ.token == usernum.token){
				console.log("登陆成功");
				ctx.params.token=userQQ.token
				ctx.params.message="登陆成功！"
			}
			else throw "QQ号或者一卡通错误"
		}
		await next()
	} else {
		let token = ctx.request.headers.authorization
		if (token) {
			let user = await userdb.findOne({ token })
			console.log(user);
			if (user) {
				let { _id } = user
				ctx.params._id = ObjectId(_id)
				await next()
			}
			else throw "请重新登陆"
		}
		else throw "您尚未登录"
	}
	return "登陆成功"
}
