const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/createTeam"

exports.route = {
    async get({ QQ, newteamname }) {

        try {
            let userdb = await mongodb("user")
            let teamdb = await mongodb("team")

            let { teamname } = await userdb.findOne({ QQ })
            if (teamname) throw "你已经加入过队伍了"

            let team = await teamdb.findOne({teamname:newteamname})
            if(team)throw "这个队名已经被使用了"

            let member=[]
            teamname = newteamname
            member.push(QQ)
            let teampoint=0

            await teamdb.insertOne({ teamname ,  member  ,teampoint})
            await userdb.updateOne({ QQ }, { $set: { teamname } })

        } catch (e) {
            console.log(e)
            throw e
        }
        return "创建成功"
    }
}


