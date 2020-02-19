

const axios = require('axios')
const { config } = require('../app')



module.exports = async (ctx, next) => {
  await next()
  return
}
