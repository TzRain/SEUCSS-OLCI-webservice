const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/user/get"

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


