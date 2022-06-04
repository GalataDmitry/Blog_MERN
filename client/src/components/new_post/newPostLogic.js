import {useSelector} from "react-redux"
import {
    setName,
    setTitle,
    setPost,
    setUserId,
    setAddStatus
} from "../../../toolkit/actions/newPostActions"
import {setChangeStatus} from "../../../toolkit/actions/postsActions"
import {setChangeBackStatus} from "../../../toolkit/actions/changePostActions"
import {changePost} from "../../../toolkit/reducers/changePostReducer"
import {setNewPost} from "../../../toolkit/reducers/newPostReducer"

export const dispatchSetNameAction = (data, dispatch) => dispatch(setName(data))
export const dispatchSetTitleAction = (data, dispatch) => dispatch(setTitle(data))
export const dispatchSetPostAction = (data, dispatch) => dispatch(setPost(data))
export const dispatchSetUserIdAction = (data, dispatch) => dispatch(setUserId(data))
const dispatchSetAddStatusAction = (data, dispatch) => dispatch(setAddStatus(data))
const dispatchSetChangeStatus = (dispatch) => dispatch(setChangeStatus(false))
const dispatchSetChangeBackStatus = (data, dispatch) => dispatch(setChangeBackStatus(data))

class NewPostLogic {

    getStatePostData = () => {
        const name = useSelector(state => state.newPostReducer.name)
        const title = useSelector(state => state.newPostReducer.title)
        const post = useSelector(state => state.newPostReducer.post)
        const userId = useSelector(state => state.newPostReducer.userId)
        const addStatus = useSelector(state => state.newPostReducer.addStatus)
        const changeStatus = useSelector(state => state.getPostsReducer.changeStatus)
        const changePostData = useSelector(state => state.getPostsReducer.changePost)
        const changeBackStatus = useSelector(state => state.changePostReducer.changeBackStatus)
        let id
        changePostData.map(el => id = el._id)
        return {id, name, title, post, addStatus, changeStatus, changePostData, changeBackStatus, userId}
    }

    fieldsClearing = (value, dispatch) => {
        return [
            dispatchSetNameAction(value, dispatch),
            dispatchSetTitleAction(value, dispatch),
            dispatchSetPostAction(value, dispatch)
        ]
    }

    checkInput = (name, title, post) => {
        return !(name.length && title.length && post.length >= 1);
    }

    redirectToPosts = (addStatus, navigate, dispatch) => {
        if (addStatus === 200) {
            navigate('/')
            return dispatchSetAddStatusAction(0, dispatch)
        }
    }

    redirectToBack = (changeBackStatus, navigate, dispatch) => {
        if (changeBackStatus === 200) {
            navigate('/')
            return [
                dispatchSetChangeStatus(dispatch),
                dispatchSetChangeBackStatus(0, dispatch)
            ]
        }
    }

    redirectToBackButtonBack = (navigate, dispatch) => {
        navigate('/')
        return dispatchSetChangeStatus(dispatch)
    }

    dataInsertion = (changePostData, dispatch) => {
        let name, title, post
        changePostData.map(el => {
            name = el.name
            title = el.title
            post = el.post
        })
        return [
            dispatchSetNameAction(name, dispatch),
            dispatchSetTitleAction(title, dispatch),
            dispatchSetPostAction(post, dispatch),
        ]
    }

    switchPostChange = (changeStatus, postData) => {
        if (changeStatus) {
            return changePost(postData)
        } else {
            return setNewPost(postData)
        }
    }

    getDataFromLocalStorage = (dispatch) => {
        dispatchSetNameAction(localStorage.getItem('username'), dispatch)
        dispatchSetUserIdAction(localStorage.getItem('userId'), dispatch)
    }
}

export default new NewPostLogic()