const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 3000
const {Server} = require('socket.io')
const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5173"
    }
  })
const {addUser, removeUser, getUser, getUserInRoom} = require('./user')

app.get('/', (req, res)=>{
    res.send("Hello World")
})

io.on('connection', (socket)=>{
    console.log("User Connected")
    socket.on('join', ({name, room}, callback)=>{
        const {user, error} = addUser({id: socket.id, name, room})
        if(error) return callback(error)
        const users = getUserInRoom(user.room)
        socket.join(user.room)
        io.to(user.room).emit('users', users)
        socket.emit('message', {userId: socket.id, name: 'admin', text: `Welcome ${user.name} to ${user.room} Room`})
        socket.to(user.room).emit('message', {userId: socket.id, name: 'admin', text: `${user.name} Joined the Chat`})
        callback()
    })
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        if(user){
            socket.emit('message', {userId: socket.id, name: user.name, text: message})
            socket.to(user.room).emit('message', {userId: socket.id, name: user.name, text: message})
            callback()
        }
    })
    socket.on('disconnect', ()=>{
        console.log("User Disconnected")
        const user = getUser(socket.id)
        if(user){
            removeUser(socket.id)
            const usersInRoom = getUserInRoom(user.room)
            socket.to(user.room).emit('users', usersInRoom)
            socket.to(user.room).emit('message', {name: user.name, text: `${user.name} left the Chat`})
        }
    })
})
server.listen(PORT, ()=>{
    console.log(`Server Listen on Port : ${PORT}`)
})