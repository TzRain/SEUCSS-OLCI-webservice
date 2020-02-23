const mongodb = require('../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/rank/get"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            let userdb = await mongodb("user")
            let a = await userdb.find().sort({ point: -1 }).toArray();
            let users= a.slice(0,14).map((user) => {
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
            let teams= b.slice(0,4).map((team) => {
                return {
                    teamname:team.teamname,
                    teamrank:team.teamrank,
                    teampoint:team.teampoint
                }
            })

            return {users,teams}
        } catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "更新成功"
    }
}