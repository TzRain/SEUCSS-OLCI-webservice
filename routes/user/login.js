// const mongodb = require('../../database/mongodb')
// const ObjectId = require('mongodb').ObjectId

exports.route = {
	async get({token}) {
        console.log(token);
        return {token}
    }
}