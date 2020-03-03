const mongodb = require('../../../database/mongodb')
const getTeams = require('../../../static/members')

exports.route = {
    async get() {
        try {
            let teamdb = await mongodb("team")
            let teams = await teamdb.find().toArray();

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


