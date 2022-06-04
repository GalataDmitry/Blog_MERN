import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom"
import {dispatchSetNameAction, dispatchSetTitleAction, dispatchSetPostAction} from './newPostLogic'
import NewPostLogic from './newPostLogic'
import '../../../styles/new_post.scss'

const NewPost = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id, name, title, post, addStatus, changeStatus, changePostData, changeBackStatus, userId} = NewPostLogic.getStatePostData()
    const postData = {name, title, post, id, userId}

    console.log(name, title, post)

    useEffect(() => {
        NewPostLogic.getDataFromLocalStorage(dispatch)
    }, [])

    useEffect(() => {
        NewPostLogic.redirectToPosts(addStatus, navigate, dispatch)
    }, [addStatus])

    useEffect(() => {
        NewPostLogic.redirectToBack(changeBackStatus, navigate, dispatch)
    }, [changeBackStatus])

    useEffect(() => {
        if (changeStatus) {
            NewPostLogic.dataInsertion(changePostData, dispatch)
        }
    }, [changeStatus])

    return (
            <div className='container-fluid w-75 mt-5 db-new-post' data-testid='post-container'>
                <div className='row'>
                    <form>
                        <p className='text-white mt-3 text-center'>{changeStatus ? 'Make changes' : 'Create your post'}</p>
                        <hr/>
                        <div className='row'>
                            <div className='col mt-3'>
                                <input
                                    onChange={(e) => dispatchSetNameAction(e.target.value, dispatch)}
                                    type="text"
                                    className="form-control db-input"
                                    placeholder="Name"
                                    aria-label="Name"
                                    value={name}
                                    data-testid='name-input'
                                />
                            </div>
                            <div className={'col mt-3'}>
                                <input
                                    onChange={(e) => dispatchSetTitleAction(e.target.value, dispatch)}
                                    type="text"
                                    className="form-control db-input"
                                    placeholder="Title"
                                    aria-label="Title"
                                    value={title}
                                    data-testid='title-input'
                                />
                            </div>
                        </div>
                        <div className="input-group mt-3">
                        <textarea
                            onChange={(e) => dispatchSetPostAction(e.target.value, dispatch)}
                            className="form-control db-input"
                            value={post}
                            data-testid='text-area'
                        >
                        </textarea>
                        </div>
                        <div className={'col text-center'}>
                            {changeStatus &&
                                <button
                                    onClick={() => {
                                        NewPostLogic.fieldsClearing('', dispatch)
                                        NewPostLogic.redirectToBackButtonBack(navigate, dispatch)
                                    }}
                                    type="button"
                                    className="btn btn-outline-dark mt-3 me-4"
                                >
                                    To back
                                </button>
                            }
                            <button
                                onClick={() => {
                                    dispatch(NewPostLogic.switchPostChange(changeStatus, postData))
                                    NewPostLogic.fieldsClearing('', dispatch)
                                }}
                                disabled={NewPostLogic.checkInput(name, title, post)}
                                type="button"
                                className="btn btn-outline-dark mt-3"
                                data-testid='send-button'
                            >
                                {changeStatus ? 'Change' : 'Post'}
                            </button>
                        </div>
                        <hr/>
                    </form>
                </div>
            </div>
    )
}

export default NewPost