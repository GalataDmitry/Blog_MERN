import {createReducer, createAsyncThunk} from '@reduxjs/toolkit'
import {NEW_POST_URL, REFRESH_URL} from "../../urlConfig"
import {refreshTokenInterceptor} from "../../auxiliary_functions/refreshTokenInterceptor";

const initialState = {
    name: '',
    title: '',
    post: '',
    userId: '',
    addStatus: 0
}

export const setNewPost = createAsyncThunk(
    'setNewPost',
    (data) => {
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({data})
        }
        return fetch(NEW_POST_URL, options)
            .then(response => {
                if (response.status === 401) {
                    return refreshTokenInterceptor(NEW_POST_URL, REFRESH_URL, options, 'status')
                } else {
                    return response.status
                }
            })
            .catch(error => console.log(error))
    }
)

export const newPostReducer = createReducer(initialState, (builder) => {

    builder.addCase('setName', (state, action) => {
        state.name = action.payload
    })
        .addCase('setTitle', (state, action) => {
            state.title = action.payload
        })
        .addCase('setPost', (state, action) => {
            state.post = action.payload
        })
        .addCase('setUserId', (state, action) => {
            state.userId = action.payload
        })
        .addCase('setAccessToken', (state, action) => {
            state.accessToken = action.payload
        })
        .addCase('setAddStatus', (state, action) => {
            state.addStatus = action.payload
        })
        .addCase(setNewPost.fulfilled, (state, action) => {
            state.addStatus = action.payload
        })
})