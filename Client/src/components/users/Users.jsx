import React from 'react'
import './users.css'
const Users = ({users}) => {
  return (
    <div className='user-container'>
      <h1>Active Users</h1>
      {users.map((user, i)=>(
        <div className='user' key={i}>
            <p>{user.name}</p>
            <i className="fa-solid fa-circle fa-2xs" style={{marginLeft: '4px', color: "#22dd2f"}}></i>
        </div>
      ))}
    </div>
  )
}

export default Users
