import React from 'react';
import { Link } from "react-router-dom";
import logo from '../SpendaWhale.svg';

function Header() {
    // let user = "Alex"
    return (
        <>
            <header className="main-head d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src={logo} className="app-logo ml-3" alt="logo" />
                </Link>
                <h1>Spenda Shop</h1>
                {/* <div><span role="img" aria-label="user-emoji">👨🏽‍💼</span>Hi {user}</div> */}
                <nav className="main-nav">
                </nav>

            </header>
        </>
    )
}
export default Header;