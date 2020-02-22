const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/createTeam"

exports.route = {
    async get({ QQ, newteamname }) {

        try {
            let userdb = await mongodb("user")
            let teamdb = await mongodb("team")
            await teamdb.remove()

            // let { teamname } = await userdb.findOne({ QQ })
            // if (teamname) return "你已经加入过队伍了"

            let team = await teamdb.findOne({teamname:newteamname})
            if(team)return "这个队名已经被使用了"

            let member=[]
            teamname = newteamname
            member.push(QQ)
            let point=0
            await teamdb.insertOne({ teamname ,  member  ,point})
            await userdb.updateOne({ QQ }, { $set: { teamname } })
        } catch (e) {
            console.log(e)
            throw "创建失败"
        }
        return "创建成功"
    }
}


