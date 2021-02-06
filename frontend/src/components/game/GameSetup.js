import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { socket } from "../Socket";

import "./GameStyle.css"

const GameSetup = () => {
    const [gameInfo, setGameInfo] = useState({p1name: "", p2name: "", room: 0})

    const history = useHistory()
    useEffect (() => {
        console.log("GAMESETTING EMIT: ",socket.id)
        socket.emit("RequestGameInfo", socket.id)
    }, [])

    socket.on("ProvideGameInfo", data => {
        setGameInfo({p1name: data.p1name, p2name: data.p2name, room: data.room})
    })

    socket.on("gameConfirm", confirmed => {
        if(!confirmed){
            socket.emit("cleanUpRoom")
            history.push("/");
        }
    })

    const goBack = () => {
        socket.emit("gameConfirm", false)
        history.push("/");
    }

    const goPlay = () => {
        socket.emit("gameConfirm", true)
        console.log("play")
        history.push("/game");
    }

    return (
        <div>
            <div className="GameSetupContent">
                <h1>IT'S A MATCH!</h1>
                <br/>
                {(gameInfo.p1name) ? <h2>{gameInfo.p1name}</h2> : <h2>. . .</h2>}
                <h3>vs.</h3>
                {(gameInfo.p2name) ? <h2>{gameInfo.p2name}</h2> : <h2>. . .</h2>}
                <span style={{fontSize: "10px"}}>{gameInfo.room}</span>
                <br/>
                <h1>Both of you want to play?</h1>
                <div className="ButtonSection">
                    <Button className="LobbyButton" onClick={goBack}>No Sorry...</Button>
                    <Button className="PlayButton" onClick={goPlay}>LET'S PLAY!</Button>
                </div>
           </div>
        </div>
    )
}

export default GameSetup
