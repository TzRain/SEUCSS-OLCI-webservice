const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/joinTeam"

exports.route = {
    async get({ QQ, newTeamname }) {

        try {
            let userdb = await mongodb("user")
            let teamdb = await mongodb("team")

            let { teamname } = await userdb.findOne({ QQ })
            if (teamname) return "你已经加入过队伍了哦"

            let team = await teamdb.findOne({ teamname: newTeamname })
            if (!team) return "这支队伍不存在"
            
            let {member}=team
            if (member.length> 4) return "该队伍已经满了哦"

            teamname = newTeamname
            member.push(QQ)
            await teamdb.updateOne({ teamname }, { $set: { member } })
            await userdb.updateOne({ QQ }, { $set: { teamname } })
        } catch (e) {
            console.log(e)
            throw "加入失败"
        }
        return "加入成功"
    }
}


