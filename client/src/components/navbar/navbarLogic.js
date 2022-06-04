import {useSelector} from "react-redux"
import {logOut} from "../../../toolkit/reducers/regAndLogReducer"

class NavbarLogic {

    getNavbarData = () => {
        const changeStatus = useSelector((state) => state.getPostsReducer.changeStatus)
        const username = localStorage.getItem('username')
        return {changeStatus, username}
    }

    logOutUser = (dispatch) => {
        dispatch(logOut())
        localStorage.removeItem('accessToken')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        setTimeout(() => window.location.reload(), 100)
    }
}

export default new NavbarLogic()