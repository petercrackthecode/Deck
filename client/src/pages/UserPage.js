import React from 'react'
import Navbar from '../components/Navbar'
import Service from '../components/Service'
import UserInfo from '../components/UserInfo'
import '../styles/UserPage.css'

function UserPage() {
    return (
        <div>
            <Navbar />
            <div className="userPageContainer">
                <div className="userStatusContainer">
                    <h1>User: NAME HERE</h1>
                    <a className="active">STATUS</a>
                </div>
                <h2>Information</h2>
                <UserInfo field={"Name"} info={"INFO HERE"} />
                <UserInfo field={"Email"} info={"INFO HERE"} />
                <h2>Access to Services:</h2>
                <div className="servicesContainer">
                    <Service service="www.google.com" status="active"/>
                    <Service service="www.google.com" status="active"/>
                    <Service service="www.google.com" status="active"/>
                    <Service service="www.google.com" status="active"/>
                    <Service service="www.google.com" status="active"/>
                </div>
            </div>
        </div>
    )
}

export default UserPage
