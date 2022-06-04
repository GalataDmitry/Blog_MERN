import Token from '../schemas/tokenSchema.js'

export const logoutController = (req, res) => {

    const {refreshToken} = req.cookies

    res.clearCookie('refreshToken')
    Token.deleteOne({refreshToken})
        .then((delToken) => res.json(delToken))
        .catch(error => console.log(error))
}