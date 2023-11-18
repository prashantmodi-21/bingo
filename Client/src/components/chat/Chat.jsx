import React, { useEffect, useState } from 'react'
import './chat.css'
import { io } from "socket.io-client"
import queryString from 'query-string';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';
import Users from '../users/Users';
let socket;
const Chat = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [roomUsers, setRoomUsers] = useState([])
    const URL = 'http://bingo-web-service.onrender.com';
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(URL);
        setName(name)
        setRoom(room)
        socket.emit('join', { name, room }, (error) => {
            if (error) setName('')
        })
        return () => socket.disconnect()
    }, [])

    useEffect(()=>{
        socket.on('users', (users)=>{
            const usersRoom = users.filter((user)=> user.id !== socket.id)
            setRoomUsers(usersRoom)
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])
    const handleSubmit = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }
    return (
        <div className="main">
            <div id="chat-ui">
                <div id="chat-info">
                    <div className="info-title">{name === '' ? "User Already Exist" : name}<i className="fa-solid fa-circle fa-2xs" style={{marginLeft: '4px', color: "#22dd2f"}}></i></div>
                    <div className="info-title">{room}<Link to="/"><i className="fa-solid fa-right-from-bracket" style={{width: "1rem", marginLeft: '1rem', color: "white"}}></i></Link></div>
                </div>
                <ScrollToBottom className="chat-room">
                    <div className='msg-container'>
                        {messages.map((message, index) => (
                            <div key={index}><span className={socket.id === message.userId ? "message-client" : "message"}><div className='message-name'>{message.name}</div>{message.text}</span></div>
                     ))}
                    </div>
                </ScrollToBottom>
                <div id="chat-input">
                    <input type="text" placeholder="Enter Your Message" name='message' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} />
                    <button disabled={name === '' ? true : false} onClick={(e) => handleSubmit(e)}>Send</button>
                </div>
            </div>
            <Users users={roomUsers}/>
        </div>
    )
}

export default Chat
