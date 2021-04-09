import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import icon from '../assets/settings.png'
import UserCard from '../components/UserCard'
import '../styles/Admin.css'

function Admin() {
    const LoggedInUserData= JSON.parse(sessionStorage.getItem('user'))
    const [data,setData] =useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onPageLoad()
    },[])
    const onPageLoad = () => {
        axios.post('http://localhost:5000/admin/list-all',{
            _id:LoggedInUserData['_id']
        })
        .then((res)=>{
            const temp = []
            res.data.map((item) => {
                temp.push(item)
            })
            setData(temp)
            console.log(temp)
            setLoading(false)
        })
    }
    return (
        <div>
            <Navbar />
            <div className="adminContainer">
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
                <h2>Name</h2>
                <div className="userContainer">
                    {
                        data.map(item => <UserCard email={item.email}  name={item.name} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin
