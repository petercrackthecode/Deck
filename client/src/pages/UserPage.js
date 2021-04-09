import React, { useEffect, useState, useContext } from 'react'
import { AuthContext, AuthContextProvider } from '../Context/AuthContext';
import Navbar from '../components/Navbar'
import Service from '../components/Service'
import UserInfo from '../components/UserInfo'
import '../styles/UserPage.css'
import axios from 'axios'

function UserPage(props) {
    // console.log(userId)
    const userEmail = props.location.state.email;
    const auth = useContext(AuthContext);
    const [domains, setDomains] = useState([])
    const LoggedInUserData= JSON.parse(sessionStorage.getItem('user'))
    console.log(LoggedInUserData);
    console.log('user-mail',props.location.state.email);
    console.log(`auth.email`, auth.email)
    const getDomains = (e) => {
        axios.post('http://localhost:5000/admin/search-user', {
            email : props.location.state.email, //this is the email of the person whose data admin wants to change and not the logged user
            _id: LoggedInUserData['_id']
        })
        .then((res)=>{
            console.log(res.data);
            setDomains(res.data)
        })
    }
    useEffect(() => {
        getDomains()
    }, [])

    const handleChange = (e) => {
        var copydomains=domains
        for (var i = 0; i < copydomains.length; i++){
            if (copydomains[i].name == e.target.value){
                copydomains[i].status = e.target.checked == true ? "active" : "disabled";
                break;
            }
        }
        axios.post('http://localhost:5000/admin/status',
        {
            _id:LoggedInUserData['_id'],            
            email: userEmail,
            status: copydomains
        })
        .then(data => console.log(data))
        .catch(err=> console.log(err))
    }


    return (
        <div>
            <Navbar />
            <div className="userPageContainer">
                <div className="userStatusContainer">
                    <h1>{props.location.state.name}</h1>
                </div>
                <h2>Information</h2>
                <UserInfo field={"Name"} info={props.location.state.name} />
                <UserInfo field={"Email"} info={props.location.state.email} />
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
