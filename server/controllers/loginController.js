import bcrypt from "bcrypt"
import {validationResult} from "express-validator"
import {createTokens} from "../auxiliary_functions/createTokens.js"
import User from "../schemas/userSchema.js"
import Token from '../schemas/tokenSchema.js'

export const loginController = async (req, res) => {

    const validateErrors = validationResult(req)

    if (!validateErrors.isEmpty()) {
        return res.status(400).json({validateErrors})
    }

    const {name, password} = req.body.userData
    const user = await User.findOne({name})
    if (!user) {
        return res.status(400).json({message: `User ${name} don\`t exist`})
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
        return res.status(400).json({message: `User ${name} already exist, but invalid password`})
    }

    const {accessToken, refreshToken} = createTokens(user._id)
    const tokenData = await Token.findOne({user: user._id})
    if (tokenData) {
        tokenData.refreshToken = refreshToken

        return [
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true}),
            tokenData.save(),
            res.status(200).json({accessToken, name, userId: user._id}),
        ]
    }
    Token.create({user: user._id, refreshToken})
        .then(() => res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 100,
            httpOnly: true
        }).status(200).json({accessToken, name, userId: user._id}))
        .catch(error => console.log(error))
}
