import React from 'react'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import '../styles/Admin.css'

function Admin() {
    return (
        <div>
            <Navbar />
            <div className="adminContainer">
                <div className="searchContainer">
                    <h1 className="adminContainerHeading">Current Users</h1>
                    <label>
                    <input
                        name="search"
                        type=""
                        placeholder="Search Users..."
                        required
                        className="form-control"
                    />
                </label>
                </div>
                <h2>Name</h2>
                <div className="userContainer">
                    <UserCard />
                </div>
            </div>
        </div>
    )
}

export default Admin
