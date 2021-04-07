import React from 'react'
import '../styles/UserInfo.css'

function UserInfo({field, info}) {
    return (
        <div className="userInfoContainer">
            <a className="field">{field}:</a>
            <a className="info">{info}</a>
        </div>
    )
}

export default UserInfo
