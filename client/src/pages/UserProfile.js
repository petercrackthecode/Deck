import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {getToken} from '../utils/common'
import {useHistory} from 'react-router-dom'

function UserProfile({userId}) {

    const [user,setUser] = useState('');
    let history = useHistory();

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
            console.log(res.data)
        })
        .catch((err)=> err)
    }

    const handleClick = () => {
        history.push('/edituser')
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.company_name}</p>
            <button onClick={handleClick}>Edit Profile</button>
        </div>
    )
}

export default UserProfile
