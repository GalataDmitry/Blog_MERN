import jwt from "jsonwebtoken"

export const validateAccessToken = (token) => {
    try{
        const validate = jwt.verify(token, process.env.ACCESS_SECRET)
        return validate
    }catch (e) {
        return null
    }
}

export const validateRefreshToken = (token) => {
    try{
        const validate = jwt.verify(token, process.env.REFRESH_SECRET)
        return validate
    }catch (e) {
        return null
    }
}