import React, { useContext } from "react"
import { UserContext } from "../App"
import Auth from "./auth/Auth"
import Lobby from "./Lobby"

const Welcome = () => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            {userData.user ? (
                <Lobby /> 
            ):(
                <Auth />
            )}
        </div>
    )
}

export default Welcome
