import {Posts} from "../schemas/newPostSchema.js"

export const getPostsController = (req, res) => {

    const {id} = req.params

    if (req.params.id === '0') {
        Posts.find().sort({createdAt: -1})
            .then(posts => res.send(posts).status(200))
            .catch(e => {
                res.sendStatus(500)
                console.log(e)
            })
    } else {
        Posts.findById(id)
            .then(changePost => res.send(changePost).status(200))
            .catch(e => {
                res.sendStatus(500)
                console.log(e)
            })
    }
}