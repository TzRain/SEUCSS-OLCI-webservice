const mongodb = require('../../../database/mongodb')

exports.route = {
	async get({ _id, newname = "" }) {
		let userdb = await mongodb('user')
		if(newname){
			let name=newname
			await userdb.updateOne({_id},{ $set: {name} })
		}else{
			throw '名字不能为空'	
		}
		return "更改成功"
	}
}