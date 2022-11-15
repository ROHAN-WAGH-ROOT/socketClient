import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");
function App() {
    const [Message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');
    const [Room, setRoom] = useState();

    const sendMessage = () => {
        socket.emit('send_message', { Message, Room })
    }
    const joinRoom = () => {
        if (Room !== '') {
            socket.emit("join_room", Room);
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("message ------->", data)
            setMessageReceived(data);
        })
    }, [socket]);
    return (
        <div className="App">
            <input style={{ width: '500px', padding: '10px', margin: '10px' }} placeholder='Enter Message' onChange={(e) => setMessage(e.target.value)} />
            <button style={{ width: '200px', padding: '10px', margin: '10px', background: 'black', color: 'white', outline: 'none', border: 'none' }} type='submit' onClick={sendMessage}> Send Message </button>
            <input style={{ width: '500px', padding: '10px', margin: '10px' }} placeholder='Enter Room' onChange={(e) => setRoom(e.target.value)} />
            <button style={{ width: '200px', padding: '10px', margin: '10px', background: 'black', color: 'white', outline: 'none', border: 'none' }} type='submit' onClick={joinRoom}> Send Room </button>
            <h1>Message : {messageReceived}</h1>
        </div>
    );
}

export default App;
