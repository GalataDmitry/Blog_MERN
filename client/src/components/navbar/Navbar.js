import React from 'react'
import {useDispatch} from "react-redux"
import {NavLink, Route, Routes} from "react-router-dom"
import Posts from "../posts/Posts"
import NewPost from "../new_post/NewPost"
import NavbarLogic from "./navbarLogic"
import '../../../styles/navbar.scss'

const Navbar = () => {

    const dispatch = useDispatch()
    const {changeStatus, username} = NavbarLogic.getNavbarData()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid db-navbar">
                    <div className="navbar-brand ms-2 db-brand">Dev blog</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
                            <li className="nav-item">
                                <NavLink
                                    to={'/'}
                                    className="nav-link "
                                    aria-current="page"
                                    type={'button'}
                                >
                                    {!changeStatus && 'Posts'}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={'/new_post'}
                                    className="nav-link"
                                    type={'button'}
                                >
                                    {!changeStatus && ' New post'}
                                </NavLink>
                            </li>
                            <li className="nav-item" style={{marginTop: '1px'}}>
                                <div className="dropdown">
                                    <a className="btn dropdown-toggle" id="dropdownMenuButton1"
                                       data-bs-toggle="dropdown" aria-expanded="false"
                                    >
                                        {!changeStatus && username}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <a
                                                onClick={() => NavbarLogic.logOutUser(dispatch)}
                                                className="dropdown-item"
                                                type='button'
                                            >
                                                Log out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path={'/'} element={<Posts/>}/>
                <Route path={'/new_post'} element={<NewPost/>}/>
            </Routes>
        </>
    )
}

export default Navbar
