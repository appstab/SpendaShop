
import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Link className="btn btn-primary" to="/new">New List</Link>
            <h2>Home</h2>
        </>
    )
}

export default Home;