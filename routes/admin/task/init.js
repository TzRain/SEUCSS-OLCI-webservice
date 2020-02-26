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
                v: 4,
                limt: [60 * 5, 60 * 6 + 30, 60 * 7]
            })
            task.push({
                taskNum: "12",
                v: 4,
                limt: [60 * 10, 60 * 11]
            })
            for(let i=1;i<10;i++){
                task.push({
                    taskNum: i.toString(),
                    v: i%5+1,
                    limt: [0, 60 * 24]
                })
            }
            for(let i=13;i<20;i++){
                task.push({
                    taskNum: i.toString(),
                    v: i%5+1,
                    limt: [0, 60 * 24]
                })
            }
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