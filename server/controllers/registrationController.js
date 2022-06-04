import bcrypt from 'bcrypt'
import {validationResult} from "express-validator"
import User from "../schemas/userSchema.js"

export const registrationController = async (req, res) => {

    const validateErrors = validationResult(req)

    if (!validateErrors.isEmpty()) {
        return res.status(400).json({validateErrors})
    }

    const {name, password} = req.body.userData
    const newUser = await User.findOne({name})

    if (newUser) {
        return res.status(400).json({message: `User ${name} already exist`})
    }

    const hashPassword = bcrypt.hashSync(password, 3)

    return User.create({name, password: hashPassword})
        .then((newUser) =>
            res.status(200).json({message: `user ${name} successfully created`}))
        .catch(e => {
            console.log(e)
            res.status(500)
        })
}