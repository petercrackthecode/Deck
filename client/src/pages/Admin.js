import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import '../styles/Admin.css'

function Admin() {
    const [data,setData] =useState('')
    const [user, setUser] = useState('');

    useEffect(() => {
        onPageLoad()
    },[])

    const onPageLoad = () => {
        axios.get('http://localhost:5000/users/')
        .then((res)=>{
            setData(res.data)
        })
    }
    console.log(data)
    return (
        <div>
            <Navbar />
            <div className="adminContainer">
                <div className="searchContainer">
                    <h1 className="adminContainerHeading">Current Users</h1>
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
                        data.map(item => {
                           return <UserCard  name={item.name} />
                        })
                    }
                    {/* {
                        Object.keys(data).map((item,i)=>{
                            <UserCard key={i} name={data[item].name} />
                        })
                    } */}
                    {/* <UserCard key={i} name={data[item].name} /> */}
                </div>
            </div>
        </div>
    )
}

export default Admin
