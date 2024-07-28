const {Pool} = require('pg')

const db = new Pool({
    user : 'admin',
    host : 'indirectly-normal-sawfly-iad.a1.pgedge.io',
    database : 'cap_stone',
    password : 'YH9Hu2b3L34ZvMtr1l151E0x'
})

module.exports = db
