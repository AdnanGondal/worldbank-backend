const express = require("express");
const sessionsController = require("../controllers/sessions.controllers");
const router = express.Router();

router.get("/cookie", sessionsController.verifyUserSession);

module.exports = router;
