/** @format */

const express = require("express");
const {
	addUser,
	userLogin,
	userView,
} = require("../Controller/Login/LoginController");
const router = express.Router();
const authRoute = require("../Middlewire/UserMiddlewire");
const { myValidations } = require("../Validator/Validator");

router.post("/api-user-singup", myValidations, addUser);
router.post("/api-user-login", userLogin);
router.get("/api-user-view", authRoute, userView);

module.exports = router;
