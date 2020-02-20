
const axios = require('axios')
const { config } = require('./app')
const crypto = require('crypto')

const hash = value => {
  return Buffer.from(crypto.createHash('sha256').update(value).digest()).toString('hex')
}


function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message)
  }
  return false
}

exports.start = () => {
  const testClient = axios.create({
    baseURL: `http://localhost:${config.port}/`,
    validateStatus: () => true
  })

  console.log('启动 seucse-sxb-webservice')


  
}
