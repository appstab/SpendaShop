import React from 'react';
import { Link } from "react-router-dom";
import logo from '../SpendaWhale.svg';

function Header() {
    let user = "Alex"
    return (
        <>
            <header className="main-head d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src={logo} className="app-logo ml-3" alt="logo" />
                </Link>
                <h1>Spenda Shop</h1>
                <div><span role="img" aria-label="user-emoji">👨🏽‍💼</span>Hi {user}</div>
                <nav className="main-nav">
                    {/* <ul>
                        <li><button type="button">Nav 1</button></li>
                        <li><button type="button">Nav 2</button></li>
                        <li><button type="button">Nav 3</button></li>
                    </ul> */}
                    {/* <HamburgerMenu
                        isOpen={this.state.open}
                        menuClicked={this.handleClick.bind(this)}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color='black'
                        borderRadius={0}
                        animationDuration={0.5}
                    /> */}
                </nav>

            </header>
        </>
    )
}
export default Header;