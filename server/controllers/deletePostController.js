import {Posts} from "../schemas/newPostSchema.js"

export const deletePostController = (req, res) => {

    const {ID} = req.body

    Posts.findByIdAndDelete(ID)
        .then(() => res.sendStatus(200))
        .catch(e => {
            res.sendStatus(500)
            console.log(e)
        })
}