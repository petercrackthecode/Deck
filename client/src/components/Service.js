import React from 'react'
import icon from '../assets/settings.png'
import '../styles/Service.css'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function Service({service, status, handleChange}) {

    const statusClass = "status " + status

    return (
        <div className="ServiceContainer">
            <h1>{service}</h1>
            <div className="endServiceContainer">
            <div className={statusClass}/>
            <Toggle
                defaultChecked={status == "active" ? true : false}
                value={service}
                onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Service
