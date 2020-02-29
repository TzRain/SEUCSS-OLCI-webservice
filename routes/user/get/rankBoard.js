const mongodb = require('../../../database/mongodb')

exports.route = {
    async get() {
        try {
            let userdb = await mongodb("user")
            let a = await userdb.find().sort({ point: -1 }).toArray();
            let users= a.slice(0,10).map((user) => {
                return {
                    QQ:user.QQ,
                    num:user.num,
                    name:user.name,
                    rank:user.rank,
                    point:user.point
                }
            })
            let teamdb = await mongodb("team")
            let b = await teamdb.find().sort({ teampoint: -1 }).toArray();
            let teams= b.slice(0,5).map((team) => {
                return {
                    teamname:team.teamname,
                    teamrank:team.teamrank,
                    teampoint:team.teampoint
                }
            })
            return {users,teams}
        } catch (e) {
            console.log(e);
            throw "获取失败"
        }
    }
}

