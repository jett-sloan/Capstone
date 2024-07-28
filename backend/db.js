const {Pool} = require('pg')

const db = new Pool({
    user : 'app',
    host : 'indirectly-normal-sawfly-iad.a1.pgedge.io',
    database : 'cap_stone',
    password : 'E51Yx9i1bC4rRK1LUbZ678d5'
})

module.exports = db
