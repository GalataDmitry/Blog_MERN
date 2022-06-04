import {createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import {CHANGE_POST_URL, REFRESH_URL} from "../../urlConfig"
import {refreshTokenInterceptor} from "../../auxiliary_functions/refreshTokenInterceptor"

const initialState = {changeBackStatus: 0}

export const changePost = createAsyncThunk(
    'changePost',
    (changePostData) => {
        let options = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({changePostData})
        }
        return fetch(CHANGE_POST_URL, options)
            .then(response => {
                if (response.status === 401) {
                    return refreshTokenInterceptor(CHANGE_POST_URL, REFRESH_URL, options, 'status')
                } else {
                    return response.status
                }
            })
            .catch(error => console.log(error))
    }
)

export const changePostReducer = createReducer(initialState, (builder) => {
    builder.addCase(changePost.pending, (state, action) => {
    })
        .addCase(changePost.fulfilled, (state, action) => {
            state.changeBackStatus = action.payload
        })
        .addCase('setChangeBackStatus', (state, action) => {
            state.changeBackStatus = action.payload
        })
})