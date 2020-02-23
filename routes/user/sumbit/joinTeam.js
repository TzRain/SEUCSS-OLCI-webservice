const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/joinTeam"

exports.route = {
    async get({ QQ, newteamname }) {

        try {
            let userdb = await mongodb("user")
            let teamdb = await mongodb("team")

            let { teamname } = await userdb.findOne({ QQ })
            if (teamname) throw "你已经加入过队伍了哦"

            let team = await teamdb.findOne({ teamname: newteamname })
            if (!team) throw "这支队伍不存在"
            
            let {member}=team
            if (member.length> 4) throw "该队伍已经满了哦"

            teamname = newteamname
            member.push(QQ)
            await teamdb.updateOne({ teamname }, { $set: { member } })
            await userdb.updateOne({ QQ }, { $set: { teamname } })
        } catch (e) {
            console.log(e)
            throw e
        }
        return "加入成功"
    }
}
