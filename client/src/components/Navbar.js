import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div className="navbarContainer">
            <Link to="/admin">Manage Users</Link>
            <Link to="/services">Services</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}

export default Navbar
