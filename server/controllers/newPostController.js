import {Posts} from "../schemas/newPostSchema.js"

export const newPostController = (req, res) => {

    const {name, title, post, userId} = req.body.data

    Posts.create({name, title, post, userId})
        .then(() => res.sendStatus(200))
        .catch(e => {
            res.sendStatus(500)
            console.log(e)
        })
}