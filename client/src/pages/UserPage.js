import React from 'react'
import Navbar from '../components/Navbar'
import Service from '../components/Service'
import UserInfo from '../components/UserInfo'
import '../styles/UserPage.css'

function UserPage() {

    const domains = [
        {
            name: "google.com",
            status: "active"
        },
        {
            name: "figma.com",
            status: "disabled"
        }
    ]
    console.log(domains)
    const handleChange = (e) => {
        for (var i = 0; i < domains.length; i++){
            if (domains[i].name == e.target.value){
                domains[i].status = e.target.checked == true ? "active" : "disabled";
                break;
            }
            console.log(domains)
        }
    }


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
                    {domains.map((service) => {
                        return(
                            <Service handleChange={handleChange} service={service.name} status={service.status}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserPage
