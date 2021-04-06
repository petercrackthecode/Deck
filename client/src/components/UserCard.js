import React from 'react'
import icon from '../assets/settings.png'
import '../styles/UserCard.css'

function UserCard() {
    return (
        <div className="userCardContainer">
            <h1>Name Goes Here</h1>
            <div className="endContainer">
                <a className="active">Active</a>
                <img src={icon}/>
            </div>
        </div>
    )
}

export default UserCard
