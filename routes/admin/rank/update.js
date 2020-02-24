const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/rank/update"

async function updatePoint () {
    let teamdb = await mongodb("team")
    let userdb = await mongodb("user")
    let teams = await teamdb.find().toArray();

    for(t in teams){
        let {member,v}=teams[t]
        v=0;
        for(x in member){
            let user=await userdb.findOne({_id:ObjectId(member[x])})
            let {point,doneList} = user
            for(i in doneList){
                if(!doneList[i].vis){
                    doneList[i].vis=true
                    point+=doneList[i].v
                    v+=doneList[i].v
                }
            }
            await userdb.updateOne({_id:ObjectId(member[x])},{ $set: { doneList,point} })
        }
        await teamdb.updateOne({_id:ObjectId(team._id)},{ $set: { v } })
    }

    teams = await teamdb.find().sort({ v: -1 }).toArray();

    let limt=[teams[2].v,teams[5].v,teams[9].v,teams[14].v]
    let scor=[10,8,6,4]

    for(t in teams){
        let {v,teampoint}= teams[t]
        for(i in limt){
            if(v>=limt[i]){
                teampoint+=scor[i]
                break
            }
        }
        await teamdb.updateOne({_id:ObjectId(teams[t]._id)},{ $set: { teampoint } })
    }
}

async function updateRank() {
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
}


exports.route = {
    async get() {
        let pretime;

        if(!pretime){
            pretime=new Date()
        }else if(pretime.getDate()==new Date().getDate()){
            throw "今天已经更新过了"
        }
        pretime=new Date()

        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            await updatePoint()
            await updateRank()
        } catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "排名更新成功"
    }
}