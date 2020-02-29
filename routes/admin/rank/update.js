const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

exports.route = {
    async get() {
        try {
            let userdb = await mongodb("user")
            let users = await userdb.find().sort({ point: -1 }).toArray();
            for(i in users){
                let _id=ObjectId(users[i]._id)
                let user=await userdb.findOne({_id})
                for(j in users){
                    if(user.point==users[j].point){
                        let rank=Number(Number(j)+1)
                        userdb.updateOne({_id},{ $set: { rank } })
                        break
                    }
                }
            }

            let teamdb = await mongodb("team")
            let teams = await teamdb.find().sort({ teampoint: -1 }).toArray();
            for(i in teams){
                let team=await teamdb.findOne({_id:ObjectId(teams[i]._id)})
                for(j in teams){
                    if(team.teampoint == teams[j].teampoint){
                        let teamrank=Number(Number(j)+1)
                        teamdb.updateOne({_id:ObjectId(teams[i]._id)},{ $set: { teamrank } })
                        break
                    }
                }
            }
        } catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "排名更新成功"
    }
}