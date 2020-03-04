const mongodb = require('../../../database/mongodb')
const getTeams = require('../../../static/members')

exports.route = {
    async get({limt=0}) {
        try {
            let teamdb = await mongodb("team")
            let teams = await teamdb.find().toArray();
            teams=teams.filter(res=>
                res.teampoint>=limt
            )
            for(i in teams){
                teams[i].members=await getTeams(teams[i].teamname)
            }
            return teams
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}


