const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()


const register = async(req,res)=>{
    try {
        let {email,password} = req.body;

        let user = await UserModel.findOne({email:email});

        if(user) return res.status(403).json({Message:"User already exists. Please login"});

        let hashedPassword = await bcrypt.hash(password,7);

        req.body.password = hashedPassword

        let newUser = new UserModel(req.body);
        await newUser.save();

        res.status(200).json({Message:"New user registered"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while registering"})
    }
}

const login = async(req,res)=>{
    try {
        let {email,password} = req.body;

        let user = await UserModel.findOne({email:email})

        if(!user) return res.status(404).json({Message:"User not found. Please register"})

        let passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) return res.status(403).json({Message:"Invalid credentials"})

        let payload = {
            email:user.email,
            id:user._id,
        }

        let accessToken = jwt.sign(payload, process.env.SECRET_KEY)

        res.status(200).json({Message:"Login",accessToken});


    } catch (error) {
        console.log(error);
        res.status(500).json({Error:"Error while login"})
    }
}
module.exports={
    register,login
}