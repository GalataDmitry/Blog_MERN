import {configureStore} from '@reduxjs/toolkit'
import {newPostReducer} from "../reducers/newPostReducer"
import {getPostsReducer} from "../reducers/getPostsReducer"
import {deletePostReducer} from "../reducers/deletePostReducer"
import {changePostReducer} from "../reducers/changePostReducer"
import {regAndLogReducer} from "../reducers/regAndLogReducer"

const store = configureStore({
        reducer: {
            newPostReducer,
            getPostsReducer,
            deletePostReducer,
            changePostReducer,
            regAndLogReducer
        }
    }
)

export default store