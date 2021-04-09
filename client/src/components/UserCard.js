import React, { useEffect } from 'react'
import icon from '../assets/settings.png'
import '../styles/UserCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UserPage from '../pages/UserPage'
function UserCard({name,email}) {
    return (
        <Link to={{
            pathname:'/user',
            
            state:{
                email:email,
                name:name
            }
            
        }}
        className="userCardLink">
            <div className="userCardContainer">
            <h1>{name}</h1>
            <div className="endContainer">
                
                <img src={icon}/>
            </div>
        </div>
        </Link>
        
    )
}

export default UserCard
