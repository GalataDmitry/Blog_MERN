import {Router} from "express"
import {getPostsController} from "../controllers/getPostsController.js"
import {newPostController} from "../controllers/newPostController.js"
import {changePostController} from "../controllers/changePostController.js"
import {deletePostController} from "../controllers/deletePostController.js"
import {registrationController} from "../controllers/registrationController.js"
import {refreshController} from "../controllers/refreshController.js"
import {loginController} from "../controllers/loginController.js"
import {logoutController} from "../controllers/logoutController.js"
import {validTokenMiddleware} from "../middlewares/validTokenMiddleware.js"
import {validFormMiddleware} from "../middlewares/validFormMiddleware.js"


const router = new Router()

router.get('/get_posts/:id', validTokenMiddleware, getPostsController)
router.post('/new_post', validTokenMiddleware, newPostController)
router.put('/change_post', validTokenMiddleware, changePostController)
router.delete('/del_post', validTokenMiddleware, deletePostController)

router.post('/registration', validFormMiddleware(), registrationController)
router.post('/login', validFormMiddleware(), loginController)
router.post('/logout', logoutController)
router.get('/refresh', refreshController)

export default router