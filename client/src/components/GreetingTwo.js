import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Greeting.css'

function GreetingTwo() {
    return (
        <div className="greetingContainer">
            <h1>Welcome Back!</h1>
            <h2>To keep connected with us please login with your personal info</h2>
            <Link to="/"><button> SIGN IN</button></Link>
        </div>
    )
}

export default GreetingTwo
