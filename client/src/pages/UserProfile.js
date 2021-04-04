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
        await axios.get(`http://localhost:3000/users/${userId}`, {
            headers:{"x-access-token":getToken()}
        })
        .then((res)=> {
            setUser(res.user)
        })
        .catch((err)=> err)
    }

    return (
        <div>
            <h3>Name</h3>
            <p>Company Name</p>
            <button>Edit Profile</button>
        </div>
    )
}

export default UserProfile
