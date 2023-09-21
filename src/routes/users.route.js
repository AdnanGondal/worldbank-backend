const express = require("express");
const usersController = require("../controllers/users.controllers");
const router = express.Router();

router.post("/", usersController.userRegister);

router.post("/session", usersController.userLogin);

module.exports = router;
