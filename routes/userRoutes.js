const express = require("express");
const router = express.Router();
var userController = require("../controllers/userController");
var auth = require('../middleware/auth')

// User registration
router.post("/users/register", userController.register);

// User login
router.post("/users/login", userController.login);

// Get user profile
router.get("/users/me", auth, userController.getUserProfiles);

module.exports = router;