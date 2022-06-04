import Token from "../schemas/tokenSchema.js"
import {createTokens} from "./createTokens.js"

export const validCookieRefreshToken = async (validateRefreshToken, token) => {
    if (!token) {
        return ({message: 'refresh token error'})
    }
    const valid = validateRefreshToken(token)
    const tokenInDb = await Token.findOne({token})
    if (!valid || !tokenInDb) {
        return ({message: 'invalid access token'})
    }
    const {refreshToken, accessToken} = createTokens(tokenInDb.user)
    tokenInDb.refreshToken = refreshToken
    tokenInDb.save()
    return {refreshToken, accessToken}
}