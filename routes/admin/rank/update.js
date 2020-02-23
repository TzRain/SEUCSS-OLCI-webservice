const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/rank/update"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            let userdb = await mongodb("user")
            let a = await userdb.find().sort({ point: -1 }).toArray();
            let users= a.map((user) => {
                return {
                    id:user._id,
                    point:user.point
                }
            })

            for(i in users){
                let _id=ObjectId(users[i].id)
                let user=await userdb.findOne({_id})
                for(j in users){
                    if(user.point==users[j].point){
                        let rank=Number(j+1)
                        userdb.updateOne({_id},{ $set: { rank } })
                        break
                    }
                }
            }

            let teamdb = await mongodb("team")
            let b = await teamdb.find().sort({ teampoint: -1 }).toArray();
            let teams= b.map((team) => {
                return {
                    id:team._id,
                    teampoint:team.teampoint
                }
            })
            for(i in teams){

                let team=await teamdb.findOne({_id:ObjectId(teams[i].id)})
                for(j in teams){
                    if(team.teampoint == teams[j].teampoint){
                        let teamrank=Number(j+1)
                        teamdb.updateOne({_id:ObjectId(teams[i].id)},{ $set: { teamrank } })
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