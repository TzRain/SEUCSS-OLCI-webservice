// const mongodb = require('../../database/mongodb')
// const ObjectId = require('mongodb').ObjectId

exports.route = {
	async get({message,token}) {
        return {message,token}
    }
}