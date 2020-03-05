const mongodb = require('../../../database/mongodb')

exports.route = {
    async get({limt}) {
        if(!limt)limt=0
        try {
            let userdb = await mongodb("user")
            let a=await userdb.find().toArray()
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
            return users.filter(res=>
                Number(res.point)>=Number(limt)    
            )
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


