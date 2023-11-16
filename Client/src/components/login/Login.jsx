import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState({
    name: '',
    room: ''
  })
  const handleChange = (e)=>{
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  return (
    <div className="main">
        <div id="login-form">
            <h1 id="title">Bingo - A Chat App</h1>
            <div className="input-element">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' onChange={handleChange}/>
            </div>
            <div className="input-element">
                <label htmlFor="room">Room</label>
                <input type="text" name='room' onChange={handleChange}/>
            </div>
            <Link to={user.name && user.room ? `/chat?name=${user.name}&room=${user.room}` : null} >
              <button>Submit</button>
            </Link>
        </div>
    </div>
  )
}

export default Login
