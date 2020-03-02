const mongodb = require('../../../database/mongodb')

exports.route = {
    async get() {
        try {
            let userdb = await mongodb("user")
            let a = await userdb.find().sort({ point: -1 }).toArray();
            a=a.slice(0,10);
            let users= a.map((user) => {
                let rank = a.length;
                for(i in a){
                    if(user.point>=a[i].point){
                        rank=Number(Number(i)+1)
                        break;
                    }
                }
                return {
                    rank,
                    QQ:user.QQ,
                    num:user.num,
                    name:user.name,
                    point:user.point
                }
            })

            let teamdb = await mongodb("team")
            let b = await teamdb.find().sort({ teampoint: -1 }).toArray();
            b=b.slice(0,5);
            let teams= b.map((team) => {
                let teamrank = b.length;
                for(i in b){
                    if(team.teampoint>=b[i].teampoint){
                        teamrank=Number(Number(i)+1)
                        break
                    }
                }
                return {
                    teamrank,
                    teamname:team.teamname,
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

