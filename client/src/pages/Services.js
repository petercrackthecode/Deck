import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/Services.css'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Services() {
    const [data, setData] = useState([])
    const LoggedInUserData = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        handleServices()
    },[]) 

    const handleServices = () => {
        axios.post('http://localhost:5000/admin/list-by-service', {
            _id: LoggedInUserData['_id'],
            company_name:LoggedInUserData['company_name']
        })
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar />
            <div className="servicesContainer">
                <div className="searchContainer">
                    <h1 className="adminContainerHeading">Current Services</h1>
                    <label>
                        <input
                            name="search"
                            type=""
                            placeholder="Search Users..."
                            required
                            className="form-control"
                        />
                    </label>
                </div>
            </div>
            <Accordion allowZeroExpanded className="accordionContainer">
                {data.map((service) => (
                    <AccordionItem key={service} className="serviceItem">
                        <AccordionItemHeading>
                            <AccordionItemButton className="headingText">
                                {service.service}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {service.users.map((user) => {
                                return(
                                    <h1><Link className={"serviceUser"} to="/services">{user}</Link></h1>
                                )
                            })}
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
                    
        </div>
    )
}

export default Services
