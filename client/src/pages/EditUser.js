import axios from 'axios'
import React,{useState} from 'react'
import {getToken} from '../utils/common'
import {useHistory} from 'react-router-dom'

function EditUser({userId}) {

    const [name,setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    let history = useHistory()

    const updateChange = (e) => {
        if(e.target.name === 'name')
        setName(e.target.value)
    else if(e.target.name ==='companyName')
        setCompanyName(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var newData={
            _id:userId
        }
        if(name!='')
        newData['name']=name;
        if(companyName!='')
        newData['company_name']=companyName
        axios.post('http://localhost:5000/api/auth/update',newData,{headers:{"x-access-token":getToken()}})
        .then(res=>console.log(res))
        .then(()=>history.push('/user'))
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
            <label>
              <b>Edit name:</b>
              <input
                name="name"
                type=""
                placeholder="name"
                onChange={updateChange}
              /><br/><br/>
              </label>
              <label>
              <b>Company name:</b>
              <input
                name="companyName"
                type=""
                placeholder="Company Name"
                onChange={updateChange}
              />
              </label><br/><br/>
              <label>
              <b>password:</b>
              <input
                name="password"
                type="password"
                placeholder="password"
              />
              </label><br/><br/>
              <label>
              <b>confirm password:</b>
              <input
                name="password"
                type="password"
                placeholder="password"
              />
              </label>
              <button
              type="submit"
            >
              Update
            </button>
              </form>
        </div>
    )
}

export default EditUser
