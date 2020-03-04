const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

exports.route = {
    async get() {
        try {
            let teamdb = await mongodb("team")
            let teams = await teamdb.find().sort({ v: -1 }).toArray();
            let scor=[]
            let limt=[]
            let length=teams.length

            console.log(teams);

            if(teams[0].v==0){
                throw "你是不是手贱了hhh"    
            }

            scor.push(10)
            if(2<length)limt.push(teams[2].v)
            else limt.push(teams[length-1].v)
        
            scor.push(8)
            if(5<length)limt.push(teams[5].v)
            else limt.push(teams[length-1].v)
            scor.push(6)
            if(9<length)limt.push(teams[9].v)
            else limt.push(teams[length-1].v)
            for(t in teams){
                let {v,teampoint}= teams[t]
                for(i in limt){
                    if(v>=limt[i]){
                        teampoint+=scor[i]
                        break
                    }
                }
                console.log(teams[t].teamname+"本日获得"+teams[t].v+"分");
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