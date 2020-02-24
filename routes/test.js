const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "test"

exports.route = {
	async get(res) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
        let userdb= await mongodb("user")
        let teamdb= await mongodb("team")
        let taskdb= await mongodb("task")
        
        if(res.remove){
            userdb.remove()
            teamdb.remove()
            taskdb.remove()
        }

        if(res){

        }

        return "访问成功"
    }
}
