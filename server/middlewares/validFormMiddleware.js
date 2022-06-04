import {check} from "express-validator"

export const validFormMiddleware = () => {
    return [
        check('userData.name', 'Name field can`t to be empty').notEmpty(),
        check('userData.password', 'Password length can be at least 2 and no more than 10').isLength({min: 2, max: 10})
    ]
}