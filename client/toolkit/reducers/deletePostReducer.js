import {createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import {refreshTokenInterceptor} from "../../auxiliary_functions/refreshTokenInterceptor";
import {DELETE_POST_URL, REFRESH_URL} from "../../urlConfig"
import {getPosts} from "./getPostsReducer"

export const deletePost = createAsyncThunk(
    'deletePost',
    (ID, {dispatch}) => {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ID})
        }
        return fetch(DELETE_POST_URL, options)
            .then(response => {
                    if (response.status === 401) {
                        return [
                            refreshTokenInterceptor(DELETE_POST_URL, REFRESH_URL, options, 'status'),
                            dispatch(getPosts())
                        ]
                    } else {
                        return dispatch(getPosts())
                    }
                }
            )
            .catch(error => console.log(error))
    }
)

export const deletePostReducer = createReducer(null, (builder) => {
    builder.addCase(deletePost.fulfilled, (state, action) => {
    })
})