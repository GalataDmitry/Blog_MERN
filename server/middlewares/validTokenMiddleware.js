import {validateAccessToken} from "../auxiliary_functions/validateTokens.js";

export const validTokenMiddleware = (req, res, next) => {

    const accessToken = req.headers.authorization
    if (!accessToken) {
        return res.sendStatus(401)
    }

    const valid = validateAccessToken(accessToken.split(' ')[1])
    if (!valid) {
        return res.sendStatus(401)
    }
    // req.user = valid
    next()
}