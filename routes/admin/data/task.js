const mongodb = require('../../../database/mongodb')

exports.router ={
    async get({task}){
        let userdb = await mongodb("user")
        let users = await userdb.find().toArray()
        let tasks ={
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0,
        13:0,
        14:0,
        15:0,
        16:0,
        17:0,
        };
        
        users.forEach(user=>{
            user.doneList.forEach(
                done=>{
                    tasks[done.taskNum]++
                }
            )
        })
        return tasks
    }
}