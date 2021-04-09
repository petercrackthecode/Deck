import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Services.css'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion'
import { Link } from 'react-router-dom'

function Services() {

    const mockServices = [
        {
            "service": "www.indiethreads.com",
            "users": [
                "Keshavaa Shaiskandan",
                "Peter"
            ]
        },
        {
            "service": "www.autobot.com",
            "users": [
                "Anjali",
                "Peter"
            ]
        }
    ]

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
                {mockServices.map((service) => (
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
