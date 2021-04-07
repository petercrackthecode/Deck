import React from 'react'
import '../styles/Layout.css'

function Layout(props) {
    return (
        <div className="layoutContainer">
            {props.children}
        </div>
    )
}

export default Layout
