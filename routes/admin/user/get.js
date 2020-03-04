const mongodb = require('../../../database/mongodb')

exports.route = {
    async get({limt=0}) {
        console.log(Number(limt));
        try {
            let userdb = await mongodb("user")
            let users=await userdb.find().toArray()
            return users.filter(res=>
                Number(res.point)>=Number(limt)    
            )
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


