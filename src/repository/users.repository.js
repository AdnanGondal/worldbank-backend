const db = require("./db");

const getDuplicateRegistrations = async function (userename) {
	return db.query("SELECT username FROM users WHERE username=$1", [userename]);
};

const createUser = async function (userename, password) {
	return db.query("INSERT INTO users(username,password) VALUES($1,$2)", [
		userename,
		password,
	]);
};

const getUserIdAndPassword = async function (userename) {
	return db.query("SELECT id,password FROM users WHERE username=$1", [
		userename,
	]);
};

module.exports = {
	getDuplicateRegistrations,
	createUser,
	getUserIdAndPassword,
};
