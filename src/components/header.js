import React from 'react';
import { Link } from "react-router-dom";
import logo from '../SpendaWhale.svg';

function Header() {
    return (
        <>
            <header className="main-head d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src={logo} className="app-logo ml-1" alt="logo" />
                </Link>
                <h1>Spenda Shop</h1>

                <nav className="main-nav">
                    <ul>
                        {/* <li><button type="button">Nav 1</button></li>
                        <li><button type="button">Nav 2</button></li>
                        <li><button type="button">Nav 3</button></li> */}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;