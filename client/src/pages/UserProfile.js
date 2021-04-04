import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {getToken} from '../utils/common'

function UserProfile({userId}) {

    const [user,setUser] = useState('')

    useEffect(() => {
        if(userId){
            handleDetails()
        }
    },[userId])

    const handleDetails = async() => {
        console.log(userId)
        await axios.get(`http://localhost:5000/users/${userId}`, {
            headers:{"x-access-token":getToken()}
        })
        .then((res)=> {
            setUser(res.data)
            console.log(res.data.name)
        })
        .catch((err)=> err)
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <p>Company Name</p>
            <button>Edit Profile</button>
        </div>
    )
}

export default UserProfile
