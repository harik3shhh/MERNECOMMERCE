const JWT = require("jsonwebtoken");
// const userModel = require("../models/user-model");
const User = require("../models/user-model");

// PROTECTED ROUTES USING TOKEN
const requireSignIn = async(req, res, next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin access
const isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error,
        });
    }
};

module.exports = {requireSignIn, isAdmin};