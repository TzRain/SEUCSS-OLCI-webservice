const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/rank/update"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            let teamdb = await mongodb("team")
            let teams = await teamdb.find().sort({ v: -1 }).toArray();
            let scor=[]
            let limt=[]
            if(3<=teams.length){
                scor.push(10)
                limt.push(teams[2])
            }
            if(6<=teams.length){
                scor.push(8)
                limt.push(teams[5])
            }
            if(10<=teams.length){
                scor.push(6)
                limt.push(teams[9])
            }
            if(15<=teams.length){
                scor.push(3)
                limt.push(teams[14])
            }
            
            for(t in teams){
                let {v,teampoint}= teams[t]
                for(i in limt){
                    if(v>=limt[i]){
                        teampoint+=scor[i]
                        break
                    }
                }
                v=0;
                await teamdb.updateOne({_id:ObjectId(teams[t]._id)},{ $set: { teampoint,v} })
            }
            let userdb = await mongodb("user")
            let users = await userdb.find().sort({ point: -1 }).toArray();
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
            teams = await teamdb.find().sort({ teampoint: -1 }).toArray();
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