import {useSelector} from "react-redux"
import {
    setRegAndLogName,
    setRegAndLogPassword,
    removeMessage,
    removeValidateMessage
} from "../../../toolkit/actions/regAndLogActions"

export const dispatchSetRegAndLogNameAction = (data, dispatch) => dispatch(setRegAndLogName(data))
export const dispatchSetRegAndLogPasswordAction = (data, dispatch) => dispatch(setRegAndLogPassword(data))
export const dispatchRemoveMessageAction = (dispatch) => dispatch(removeMessage())
export const dispatchRemoveValidateMessageAction = (dispatch) => dispatch(removeValidateMessage())

class RegAndLogLogic {

    getRegAndLogData = () => {
        const name = useSelector(state => state.regAndLogReducer.name)
        const password = useSelector(state => state.regAndLogReducer.password)
        const stateToken = useSelector(state => state.regAndLogReducer.token)
        const message = useSelector(state => state.regAndLogReducer.message)
        const validateMessage = useSelector(state => state.regAndLogReducer.validationMessage)
        return {name, password, stateToken, message,  validateMessage};//isCreated,
    }

    isCreated = (message) => {
        if (message) {
            return message.split(' ')[3] === 'created'
        }
    }

    validateInputName = (validateMessage) => {

        let inputName = false
        validateMessage.map(el => inputName =  el.msg.split(' ')[0] === 'Name')

        if (validateMessage.length === 2) {
            return 'form-control mt-4 db-invalid-input'
        }
        if (inputName) {
            return 'form-control mt-4 db-invalid-input'
        }
        return 'form-control mt-4'
    }

    validateInputPassword = (validateMessage) => {

        let inputPassword = false
        validateMessage.map(el => inputPassword =  el.msg.split(' ')[0] === 'Password')

        if (validateMessage.length === 2) {
            return 'form-control mt-4 db-invalid-input'
        }
        if (inputPassword) {
            return 'form-control mt-4 db-invalid-input'
        }
        return 'form-control mt-4'
    }
}

export default new RegAndLogLogic()
