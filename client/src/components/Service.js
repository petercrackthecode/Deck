import React from 'react'
import icon from '../assets/settings.png'
import '../styles/Service.css'

function Service({service, status}) {

    const statusClass = "status " + status

    return (
        <div className="ServiceContainer">
            <h1>{service}</h1>
            <dic className="endServiceContainer">
            <div className={statusClass}/>
            <img src={icon} className="setting"/>
            </dic>
        </div>
    )
}

export default Service
