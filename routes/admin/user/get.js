const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

exports.route = {
    async get() {
        try {
            let userdb = await mongodb("user")
            return userdb.find().toArray()
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


