const express = require("express");
const router = express.Router();
// const authcontrollers = require("../controllers/authController");
const {register, login, testController, forgotPasswordController} = require("../controllers/authController");
const {requireSignIn, isAdmin} = require("../middlewares/authMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);

//forgot password
router.post("/forgot-password", forgotPasswordController)

//test route
router.route("/test").get(requireSignIn, isAdmin, testController);

// dashboard route
router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
});

//admin dashboard
router.get("/admin-auth", requireSignIn,isAdmin, (req, res)=>{
    res.status(200).send({ok: true});
});


module.exports = router;