const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/team/get"

exports.route = {
    async get() {
        try {
            let teamdb = await mongodb("team")
            return teamdb.find().toArray()
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


