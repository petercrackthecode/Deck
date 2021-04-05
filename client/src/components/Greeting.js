import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Greeting.css'

function Greeting() {
    return (
        <div className="greetingContainer">
            <h1>Hello, Friend!</h1>
            <h2>Enter your personal details and start your journey with us!</h2>
            <Link to="/signup"><button> SIGN UP</button></Link>
            
        </div>
    )
}

export default Greeting
