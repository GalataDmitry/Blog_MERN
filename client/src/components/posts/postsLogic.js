import {useSelector} from "react-redux"

class PostsLogic {

    getStatePostsData = () => {
        const posts = useSelector((state) => state.getPostsReducer.posts)
        const changeStatus = useSelector((state) => state.getPostsReducer.changeStatus)
        return {posts, changeStatus}
    }

    redirectToChange = (changeStatus, navigate) => {
        if (changeStatus) navigate('/new_post')
    }
}

export default new PostsLogic()