
import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (<Link className="btn btn-primary my-4" to="/new">New Shopping List</Link>)
    }
}

export default Home;