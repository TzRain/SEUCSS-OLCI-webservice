const mongodb = require('../../../database/mongodb')

exports.route = {
    async get({limt=0}) {
        try {
            let userdb = await mongodb("user")
            let users=await userdb.find().toArray()
            return users.filter(res=>
                res.point>=limt    
            )
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


