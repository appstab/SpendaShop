
import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Link className="btn btn-primary my-4" to="/new">New Shopping List</Link>
            <h2>Home</h2>
        </>
    )
}

export default Home;