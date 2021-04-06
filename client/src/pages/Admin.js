import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import icon from '../assets/settings.png'
import UserCard from '../components/UserCard'
import '../styles/Admin.css'

function Admin() {
    const [data,setData] =useState([])
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onPageLoad()
    },[])

    const onPageLoad = () => {
        axios.get('http://localhost:5000/users/')
        .then((res)=>{
            const temp = []
            res.data.map((item) => {
                temp.push(item)
            })
            setData(temp)
            setLoading(false)
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
                    {loading ? null :
                    
                        data.map((item) => {
                            const name = item.name
                            console.log(item)
                            return(
                                <div className="userCardContainer">
                                    <h1>{name}</h1>
                                    <div className="endContainer">
                                        <a className="active">Active</a>
                                        <img src={icon}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <UserCard key={i} name={data[item].name} /> */}
                </div>
            </div>
        </div>
    )
}

export default Admin
