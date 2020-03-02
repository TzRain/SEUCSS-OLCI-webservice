const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息
let f = new Array(100).fill(false)

exports.route = {
	async get({ _id }) {//GET方法
		try {
			let userdb = await mongodb('user')
			let user = await userdb.findOne({ _id })
			let { QQ, name, num, point,  teamname } = user

			let a = await userdb.find().sort({ point: -1 }).toArray();
			let rank = a.length
			for(i in a){
				if(point>=a[i].point){
					rank=Number(Number(i)+1)
					break;
				}
			}
			
			if (!teamname) return { name, num, _id, QQ, point, rank }

			let teamdb = await mongodb("team")
			let team = await teamdb.findOne({ teamname })
			let { teampoint} = team

			let b = await teamdb.find().sort({ teampoint: -1 }).toArray();
			let teamrank = b.length
			for(i in b){
				if(team.teampoint>=b[i].teampoint){
					teamrank=Number(Number(i)+1)
					break
				}
			}

			return { name, num, QQ, point, rank, teamname, teampoint, teamrank }
		} catch (e) {
			console.log(e);
			throw "查询失败"
		}
	}
}
