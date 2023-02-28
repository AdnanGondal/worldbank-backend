const db = require("./db")

const getDuplicateRegistrations = async function(userename){
    return await db.query(`SELECT username FROM users WHERE username=$1`,[userename])
}

const createUser = async function(userename, password){
    return await db.query(`INSERT INTO users(username,password) VALUES($1,$2)`,[userename,password])
}

module.exports = {
    getDuplicateRegistrations, createUser
}