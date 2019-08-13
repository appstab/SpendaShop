import React from 'react';
import { Link } from "react-router-dom";
import logo from '../SpendaWhale.svg';

class Header extends React.Component {

    constructor(props) {
        super();
    }
    // let user = "Alex"
    render() {
        return (
            <>
                <header className="main-head d-flex justify-content-between align-items-center">
                    <Link to="/">
                        <img src={logo} className="app-logo ml-3" alt="logo" />
                    </Link>
                    <h1>Spenda Shop</h1>
                    {/* <div><span role="img" aria-label="user-emoji">👨🏽‍💼</span>Hi {user}</div> */}
                    <nav className="main-nav">
                        {/* <ul>
                        </ul> */}
                        {!this.props.user && <button className="btn btn-sm btn-outline-light mr-3" onClick={this.props.login}>Log In</button>}

                        {this.props.user && <div>
                            <img src={this.props.user.photoURL} style={{ width: '50px' }} alt="user" className="rounded-circle mr-3" />
                            <span>{this.props.user.displayName}</span>
                            <button className="btn btn-sm btn-outline-light mx-3" onClick={this.props.logout}>Log Out</button>
                        </div>}

                    </nav>
                </header>
            </>
        )
    }
}
export default Header;