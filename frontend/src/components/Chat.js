import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App"
import { socket } from "./Socket";

import "./Lobby.css"

const Chat = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [msgList, setMsgList] = useState([])
    const [chatMessage, setChatMessage] = useState({name: userData.user.name, msg: ""})
 
    const handleChange = (e) => {
        setChatMessage({...chatMessage, [e.target.name]: e.target.value})
    }

    const newMessageSubmit = (e) => {
        e.preventDefault()
        const newMessage = {
            name: chatMessage.name,
            msg: chatMessage.msg,
        }

        socket.emit("newChatMessage", newMessage)

        setChatMessage({
            name: userData.user.name,
            msg: ""
        })
    }

    socket.on("newChatMessage", newMessage => {
        setMsgList([...msgList, {name: newMessage.name, msg: newMessage.msg}])
    })

    return (
        <div className="ChatComponent">
            <form onSubmit={newMessageSubmit}>
                <input type="text" name="msg" 
                    value={chatMessage.msg} placeholder="Type Your Message..."
                    onChange={handleChange} required style={{ width: "80%" }} />
                <input type="submit" value="Message!" style={{ width: "20%" }}/>
            </form>
            <div className="ChatMessages">
                <center><p>....</p></center>
                <ul style={{ listStyle:"none" }}>
                    {msgList.map((msgList, index) => {
                    return (
                        <li key={index}>
                        <b>{msgList.name}: </b>
                            <i>
                                {msgList.msg}
                            </i>
                        </li>
                    )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Chat
