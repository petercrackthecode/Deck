import React, { useEffect } from 'react'
import icon from '../assets/settings.png'
import '../styles/UserCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UserPage from '../pages/UserPage'
function UserCard({name,email}) {
    return (
        <div className="userCardContainer">
            <h1>{name}</h1>
            <div className="endContainer">
                <Link to={{
                    pathname:'/user',
                    state:{
                        email:email
                    }
                }}>Click me</Link>
                <a className="active">Active</a>
                <img src={icon}/>
            </div>
        </div>
    )
}

export default UserCard
