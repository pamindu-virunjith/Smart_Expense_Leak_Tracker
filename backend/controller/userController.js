import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login(req, res){
    try{
        const user = await User.findOne({email: req.body.email})

        if(!user){
            res.status(400).json({
                message: "User not found"
            })
            return
        }

        const isPasswordMatched = bcrypt.compareSync(req.body.password, user.password)

        if(isPasswordMatched){
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
            }, process.env.JWT_SECRET_KEY)

            res.status(200).json({
                message: "Login Successfully",
                token: token
            })
        }else{
            res.status(400).json({
                message: "Password not matched"
            })
        }

        
    }catch(error){
        // console.log(error)
        res.status(400).json({
            message: "Login Failed",
            error: error.message
        })
    }
}

export async function signup(req, res){
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await user.save()
        res.status(200).json({
            message: "Signup Successfully"
        })

    } catch (error) {
        res.status(400).json({
            message: "Signup Failed",
            error: error.message
        })
    }
}

export async function getProfile(req, res){
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({
            message: "Profile Fetched Successfully",
            data: user.name
        })
    } catch (error) {
        res.status(400).json({
            message: "Profile not fetched",
            error: error.message
        })
    }
}