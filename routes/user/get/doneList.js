const mongodb = require('../../../database/mongodb')
//获取用户基本信息
exports.route = {
	async get({ _id }) {//GET方法
		let userdb = await mongodb('user')
		let user = await userdb.findOne({ _id })
		return user.doneList.reverse()
	}
}
