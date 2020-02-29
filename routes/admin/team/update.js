const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/team/update"

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
        }catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "排名更新成功"
    }
}