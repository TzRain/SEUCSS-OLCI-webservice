const mongodb = require('../../../database/mongodb')

exports.route = {
    async get() {
        let userdb = await mongodb("user")
        let users = await userdb.find().toArray()
        let dw = [];
        let total = [];
        let statistic = {
            dw: {
                point: 0,
                person: 0,
                average: 0
            },
            total: {
                point: 0,
                person: 0,
                average: 0
            }
        }
        users.forEach(user => {
            let tpTasks = [];
            for (let i = 1; i <= 18; i++) {
                tpTasks.push({ taskNum: i, done: 0 })
            }
            user.doneList.forEach(x => {
                tpTasks[x.taskNum - 1].done++;
            })
            total.push({
                name: user.name,
                cardnum: user.num,
                point: user.point,
                tasks: tpTasks
            })
            statistic.total.point += user.point
            statistic.total.person++
            if (user.name.includes("董导应援团")) {
                dw.push({
                    name: user.name,
                    cardnum: user.num,
                    point: user.point,
                })
                statistic.dw.point += user.point
                statistic.dw.person++
            }
        })
        statistic.dw.average = statistic.dw.point / statistic.dw.person
        statistic.total.average = statistic.total.point / statistic.total.person
        return {
            statistic,
            dw,
            total,
        }
    }
}