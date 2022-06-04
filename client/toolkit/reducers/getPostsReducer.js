import {createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import {refreshTokenInterceptor} from "../../auxiliary_functions/refreshTokenInterceptor"
import {GET_POSTS_URL, REFRESH_URL} from "../../urlConfig"

const initialState = {
    posts: [],
    changePost: [],
    changeStatus: false
}

export const getPosts = createAsyncThunk(
    'getPosts',
     (ID = 0) => {
        let options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
        }
        return fetch(`${GET_POSTS_URL}${ID}`, options)
            .then(response => {
                    if (response.status === 401) {
                       return refreshTokenInterceptor(`${GET_POSTS_URL}${ID}`, REFRESH_URL, options, 'object')
                    } else {
                        return response.json()
                    }})
            .catch(error => console.log(error))
    })

export const getPostsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('setChangeStatus', (state, action) => {
            state.changeStatus = action.payload
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            if (Array.isArray(action.payload)) {
                state.posts = action.payload
            } else {
                state.changePost.push(action.payload)
                state.changeStatus = true
            }

        })
})