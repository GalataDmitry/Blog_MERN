import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {v4} from 'uuid'
import Navbar from "../navbar/Navbar"
import ErrorBoundary from "../error_boundary/ErrorBoundary"
import {
    dispatchSetRegAndLogNameAction,
    dispatchSetRegAndLogPasswordAction,
    dispatchRemoveMessageAction,
    dispatchRemoveValidateMessageAction
} from "./regAndLogLogic"
import RegAndLogLogic from "./regAndLogLogic"
import {registrationUser, loginUser} from "../../../toolkit/reducers/regAndLogReducer"
import '../../../styles/registration.scss'

const RegAndLog = () => {

    const dispatch = useDispatch()
    const {name, password, stateToken, message, validateMessage} = RegAndLogLogic.getRegAndLogData()
    const UserData = {name, password}
    const storageToken = localStorage.getItem('accessToken')
    let isCreated = RegAndLogLogic.isCreated(message)

    useEffect(() => {
        if (validateMessage.length !== 0)
            dispatchRemoveMessageAction(dispatch)
    }, [validateMessage])

    useEffect(() => {
        if (message)
            dispatchRemoveValidateMessageAction(dispatch)
    }, [message])

    return (
        <>
            {stateToken || storageToken ?
                <ErrorBoundary>
                    <Navbar/>
                </ErrorBoundary> :
                <div className='container-fluid db-container' style={{maxWidth: '400px'}}>
                    <div className='row db-main-row'>
                        <form>
                            <div className='row'>
                                <div className='col  text-white text-center mt-3'>
                                    <h3>Log In</h3>
                                    <p>Make registration if you don`t have an account</p>
                                    <hr/>
                                    <div className='text-warning'>
                                        {message}
                                        {validateMessage.map(el => <p key={v4()}>{el.msg}</p>)}
                                    </div>
                                    <input
                                        onChange={(e) => dispatchSetRegAndLogNameAction(e.target.value, dispatch)}
                                        className={RegAndLogLogic.validateInputName(validateMessage)}
                                        type="text"
                                        placeholder="name"
                                        value={name}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <input
                                        onChange={(e) => dispatchSetRegAndLogPasswordAction(e.target.value, dispatch)}
                                        className={RegAndLogLogic.validateInputPassword(validateMessage)}
                                        type="text"
                                        placeholder="password"
                                        value={password}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className='row'>
                            <div className='col db-button mt-3 mb-3'>
                                <button
                                    onClick={() => dispatch(loginUser(UserData))}
                                    className='btn btn-outline-dark '
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                        {!isCreated && <div className='row'>
                            <div className='col db-button  mb-3'>
                                <button
                                    onClick={() => dispatch(registrationUser(UserData))}
                                    className='btn btn-outline-dark'
                                >
                                    Registration
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default RegAndLog