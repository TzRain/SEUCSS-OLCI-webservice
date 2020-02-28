const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId
const tasks = require('../static/tasks')
const path = "test"

exports.route = {
	async get(res) {
        console.log(tasks);
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
        let userdb= await mongodb("user")
        let teamdb= await mongodb("team")
        if(res.remove){
            userdb.remove()
            teamdb.remove()
        }
        return "访问成功"
    }
}
