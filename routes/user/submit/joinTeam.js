const mongodb = require('../../../database/mongodb')

exports.route = {
    async get({ _id, newteamname }) {
        let userdb = await mongodb("user")
        let teamdb = await mongodb("team")

        let { teamname } = await userdb.findOne({ _id })
        if (teamname) throw "你已经加入过队伍了哦"

        let team = await teamdb.findOne({ teamname: newteamname })
        if (!team) throw "这支队伍不存在"
        
        let {member}=team
        if (member.length> 4) throw "该队伍已经满了哦"

        teamname = newteamname
        member.push(_id)
        await teamdb.updateOne({ teamname }, { $set: { member } })
        await userdb.updateOne({ _id }, { $set: { teamname } })
        return "加入成功"
    }
}
