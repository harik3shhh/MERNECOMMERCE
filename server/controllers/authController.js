const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/user-model");
const JWT = require("jsonwebtoken");

// *----------*
//   REGISTER
// *----------*

const register = async(req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        // validation
        if(!name){
            res.send({message: "Name is required!"});
        }
        if(!email){
            res.send({message: "Email is required!"});
        }
        if(!password){
            res.send({message: "Password is required!"});
        }
        if(!phone){
            res.send({message: "Phone Number is required!"});
        }
        if(!address){
            res.send({message: "Address is required!"});
        }
        if(!answer){
            res.send({message: "Address is required!"});
        }

        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already Registered please Login"
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel ({name, email, phone, address, password: hashedPassword, answer }).save();
        res.status(201).send({
            success: true, 
            message: "Registration Successful!!!",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error from Registration",
            error
        });
    }
};


// *----------*
//   LOGIN
// *----------*

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password!!!"
            });
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password!!!"
            });
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        //token
const token = await JWT.sign(
{_id: user._id},
process.env.JWT_SECRET_KEY, 
{expiresIn: "3d",});

        res.status(200).send({
            success: true,
            message: "Login successful!!!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};


// *----------*
//   FORGOT PASSWORD
// *----------*

const forgotPasswordController = async(req, res) =>{
    try {
        const { email, answer, newpassword } = req.body;
        if(!email){
            res.status(400).send("Email is required!!!");
        }

        if(!answer){
            res.status(400).send("Answer is required!!!");
        }

        if(!newpassword){
            res.status(400).send("New Password is required!!!");
        }

        //check email and answer
        const user = await userModel.findOne({email,answer});
        //validation
        if(!user){
            res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            });
        }

        const hashed = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id, {password:hashed});
        res.status(200).send({
            success: true,
            message: "Password Reset Successful!!!"
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
};


//test controller
const testController = (req, res) => {
    console.log("Procted routes");
    res.send("Protected route with token")
}

module.exports = {register, login, testController, forgotPasswordController};