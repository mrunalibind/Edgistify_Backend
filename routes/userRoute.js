let express = require("express");
const { register, login } = require("../controllers/userController");
const { inputValidatorForUser, handleValidationErrors } = require("../middleware/validation");

let userRouter = express.Router();

userRouter.route("/register").post( inputValidatorForUser, handleValidationErrors, register);
userRouter.route("/login").post(login);

module.exports = userRouter;