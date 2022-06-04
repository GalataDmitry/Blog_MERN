import jwt from "jsonwebtoken"

export const createTokens = (id) => {
    const payload = {id}
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '30s'})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'})
    return {accessToken, refreshToken}
}