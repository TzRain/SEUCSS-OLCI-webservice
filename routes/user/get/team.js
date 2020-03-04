const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId
//获取用户基本信息

exports.route = {
	async get({_id}) {//GET方法
		try {
            let userdb = await mongodb("user")
            let teamdb = await mongodb("team")
            let user=await userdb.findOne({_id})
            let teamname = user.teamname
            let users = []
            let team=await teamdb.findOne({teamname})
            let { teampoint, member }=team
            for(let i in member){
                let user=await userdb.findOne({_id:ObjectId(member[i])})
                users.push({
                    QQ:user.QQ,
                    name:user.name,
                    num:user.num,
                    point:user.point,
                    doneList:user.doneList.slice(0,3),
                })    
            }
            let b = await teamdb.find().sort({ teampoint: -1 }).toArray();
			let teamrank = b.length
			for(i in b){
				if(team.teampoint>=b[i].teampoint){
					teamrank=Number(Number(i)+1)
					break
				}
			}
            return { teampoint,teamrank,teamname,users}
		} catch (e) {
			console.log(e);
			throw e
		}
	}
}

