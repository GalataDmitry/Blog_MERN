import {validateRefreshToken} from "../auxiliary_functions/validateTokens.js"
import {validCookieRefreshToken} from "../auxiliary_functions/validCookieRefreshToken.js"

export const refreshController = async (req, res) => {

    const {refreshToken} = req.cookies

    try {
        const newTokens = await validCookieRefreshToken(validateRefreshToken, refreshToken)
        res.cookie('refreshToken', newTokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true})
        return res.status(200).json({newTokens})
    } catch (e) {
        res.sendStatus(500)
        console.log(e)
    }

}
