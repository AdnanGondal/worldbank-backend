const bcrypt = require("bcrypt");
const InvalidRequest = require("../errors/InvalidRequest");
const usersRepo = require("../repository/users.repository")

const createUser = async (username, password) => {
        const duplicate = await usersRepo.getDuplicateRegistrations(username)
        
        if (duplicate.rows.length !== 0) {
          throw new InvalidRequest("User already exists.")
        } 

        const salt = await bcrypt.genSalt(8);
        const passwordEncrypted = await bcrypt.hash(password, salt);

        usersRepo.createUser(username, passwordEncrypted);

  }

  
  module.exports = {
    createUser
  }