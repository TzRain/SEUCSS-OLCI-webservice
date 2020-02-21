const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/task/init"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try{
            let taskdb = await mongodb("task")
            let task = []
            taskdb.remove()
            task.push({
                taskNum: "11",
                point: 4,
                limt: [60 * 5, 60 * 6 + 30, 60 * 7]
            })
            task.push({
                taskNum: "12",
                point: 4,
                limt: [60 * 10, 60 * 11]
            })
            for(x in task){
                await taskdb.insertOne(task[x])
            }
        }catch(e){
            console.log(e);
            return "初始化失败"    
        }
        return "初始化成功"
    }
}