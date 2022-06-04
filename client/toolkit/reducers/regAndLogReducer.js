import {createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import {LOG_IN_URL, LOG_OUT_URL, REGISTRATION_URL} from "../../urlConfig"

const initialState = {
    name: '',
    password: '',
    message: '',
    validationMessage: []
}

export const registrationUser = createAsyncThunk(
    'createUser',
    (userData) => {
        let options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userData})
        }
        return fetch(REGISTRATION_URL, options)
            .then(response => response.json())
            .catch(error => console.log(error))
    }
)

export const loginUser = createAsyncThunk(
    'authUser',
    (userData) => {
        let options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userData})
        }
        return fetch(LOG_IN_URL, options)
            .then(response => response.json())
            .catch(error => console.log(error))
    }
)

export const logOut = createAsyncThunk(
    'logOut',
    () => {
        let options = {method: 'POST'}
        return fetch(LOG_OUT_URL, options)
            .then(response => response.json())
            .catch(error => console.log(error))
    }
)

export const regAndLogReducer = createReducer(initialState, (builder) => {
    builder.addCase('setRegAndLogName', (state, action) => {
        state.name = action.payload
    })
        .addCase('setRegAndLogPassword', (state, action) => {
            state.password = action.payload
        })
        .addCase('removeMessage', (state, action) => {
            state.message = ''
        })
        .addCase('removeValidateMessage', (state, action) => {
            state.validationMessage = []
        })
        .addCase(registrationUser.fulfilled, (state, action) => {
            state.message = action.payload.message
            if (action.payload.validateErrors) {
                state.validationMessage = action.payload.validateErrors.errors
            }
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            if (!action.payload.accessToken || !action.payload.name) {
                state.message = action.payload.message
                if (action.payload.validateErrors) {
                    state.validationMessage = action.payload.validateErrors.errors
                }
            } else {
                state.token = action.payload.accessToken
                localStorage.setItem('accessToken', action.payload.accessToken)
                localStorage.setItem('username', action.payload.name)
                localStorage.setItem('userId', action.payload.userId)
            }
        })
        .addCase(logOut.fulfilled, (state, action) => {
        })
})