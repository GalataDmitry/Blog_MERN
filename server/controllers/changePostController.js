import {Posts} from "../schemas/newPostSchema.js"

export const changePostController = (req, res) => {

    const {id, name, title, post} = req.body.changePostData

    Posts.findByIdAndUpdate(id, {name, title, post})
        .then(() => res.sendStatus(200))
        .catch(error => console.log(error))
}