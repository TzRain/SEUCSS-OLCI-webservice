const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId
const crypto = require('crypto');

const hash = value => {
	return Buffer.from(crypto.createHash('md5').update(value).digest()).toString('base64')
}

module.exports = async (ctx, next) => {
	let userdb = await mongodb('user')
	let { QQ, num } = ctx.params
	if(ctx.path.substr(0,6)=='/admin'||ctx.path=='/testforadmin'){
		await next()
	}
	else if(ctx.path=='/user/login') {
		let isQQ = /[1-9]+[0-9]{4,11}/.test(QQ);
		if (!isQQ) throw "无效QQ号"
		let isnum = /213+[0-9]{6}/.test(num);
		if (!isnum) throw "无效一卡通号"
		let userQQ = await userdb.findOne({ QQ })
		let usernum = await userdb.findOne({ num })
		console.log(userQQ);
		console.log(usernum);
		if (!userQQ && !usernum) {
			// throw "活动还没有开始哦！"
			let name = num
			let teamname = ""
			let point = 0
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
			})
			ctx.params.token=token
			ctx.params.message="注册成功！"
		} else {
			if (userQQ && usernum && userQQ.token == usernum.token){
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
			if (user) {
				let { _id ,num,QQ,name} = user
				ctx.params._id = ObjectId(_id)
				ctx.params.num = num
				ctx.params.QQ = QQ
				ctx.params.name = name
				await next()
			}
			else throw "登陆过期,请重新登陆"
		}
		else throw "您尚未登录"
	}
	return "登陆成功"
}
