import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../App"
import { socket } from "./Socket";

import PoolElem from './PoolElem'

const Pool = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [userRooms, setUserRooms] = useState({})
    const [userSearch, setUserSearch] = useState("");

    useEffect(() => {
        socket.emit("setPlayerName", userData.user.name)
    }, [])
    // if(Object.keys(userRooms).length === 0){
        
    // }

    socket.on("userList", (userList) => {
        setUserRooms(userList)
     });

    return (
        <div className="PoolComponent">
            <center>There are now {Object.keys(userRooms).length-1} other players here</center>
            <input type="text" placeholder="Search Bar..."
                className="SearchBar"
                onChange={(e) => {
                    setUserSearch(e.target.value);
                }}
            />
            <br/>
            <div className="UserListWrapper">
                {
                    Object.keys(userRooms)
                        .filter((username) => {
                        if (username.toLowerCase().includes(userSearch.toLowerCase())) {
                            return username;
                        }
                        })
                        .map((username) => {
                            return <PoolElem key={username} 
                            name={username} room={userRooms[username]}
                            ownName={userData.user.name} />
                    })
                }
            </div>
        </div>
    )
}

export default Pool
