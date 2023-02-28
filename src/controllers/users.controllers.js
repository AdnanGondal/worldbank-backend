const usersService = require("../services/users.services");

const userRegister = async function (req, res, next) {
  const { username, password } = await req.body;
  try {
    await usersService.createUser(username, password);
    res.status(201).json({ Message: "User Registered" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
};
