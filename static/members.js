const mongodb = require('../database/mongodb')
//获取用户基本信息

const getTeam = async  ( teamname ) =>{
    try {
        let userdb = await mongodb("user")
        let teamdb = await mongodb("team")
        let users = []
        let team = await teamdb.findOne({ teamname })
        let { member } = team
        // console.log(team);
        for (let i in member) {
            let user = await userdb.findOne({ _id:member[i]})
            users.push({
                QQ: user.QQ,
                name: user.name,
                num: user.num,
                point: user.point,
                doneList: user.doneList.slice(0, 3),
            })
        }
        return users
    } catch (e) {
        console.log(e);
        throw "查询失败"
    }
}

module.exports = getTeam