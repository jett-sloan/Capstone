const {Pool} = require('pg')

const db = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'cap_stone',
    password : 'sammydog12'
})

module.exports = db