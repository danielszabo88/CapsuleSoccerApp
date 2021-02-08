import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../App"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { socket } from "../Socket";

import "./GameStyle.css"

const GameOver = () => {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory()
    const [resultSent, setResultSent] = useState(false)
    const [finalResult, setFinalResult] = useState({
        p1name: "", 
        p2name: "", 
        p1score: 0,
        p2score: 0
    })
    useEffect (() => {
        socket.emit("RequestFinalResult", socket.id)
    }, [])
    useEffect (() => {
        let updateStat = {}
        if(userData.user.name === finalResult.p1name){
            updateStat = {
                name: finalResult.p1name,
                point: finalResult.p1point,
                oppName: finalResult.p2name,
                oppPoint: finalResult.p2point
            }
            if(!resultSent){
                setResultSent(true)
                console.log("DB UPDATE FOR STATS: ", updateStat)
                axios.put("/api/users/profile", updateStat, {
                    headers: {
                        "auth-token": userData.token,
                    },
                })
            }
        }
        if(userData.user.name === finalResult.p2name){
            updateStat = {
                name: finalResult.p2name,
                point: finalResult.p2point,
                oppName: finalResult.p1name,
                oppPoint: finalResult.p1point
            }
            if(!resultSent){
                setResultSent(true)
                console.log("DB UPDATE FOR STATS: ", updateStat)
                axios.put("/api/users/profile", updateStat, {
                    headers: {
                        "auth-token": userData.token,
                    },
                })
            }
        }
    }, [finalResult])

    socket.on("ProvideFinalResult", data => {
        setFinalResult({
            p1name: data.p1name, 
            p2name: data.p2name, 
            p1point: data.p1point,
            p2point: data.p2point})
    })

    socket.on("gameConfirm", confirmed => {
        if(!confirmed){
            socket.emit("cleanUpRoom")
            history.push("/");
        }
    })

    //if someone came to the URL directly
    socket.on("redirectToLobby", () => {
        history.push("/");
    })

    const goBack = () => {
        socket.emit("gameConfirm", false)
        history.push("/");
    }

    const goPlay = () => {
        socket.emit("gameConfirm", true)
        history.push("/game");
    }

    return (
        <div>
            <div className="GameOverContent">
                <h1>WHAT A GAME!</h1>
                <br/>
                <h2>{finalResult.p1name}: {finalResult.p1point}</h2>
                <h3>vs.</h3>
                <h2>{finalResult.p2name}: {finalResult.p2point}</h2>
                <br/>
                <h1>CONGRATS TO&nbsp;&nbsp;
                    {(finalResult.p1point > finalResult.p2point) ?
                    <span className="WinnerName">{finalResult.p1name}</span> :
                    <span className="WinnerName">{finalResult.p2name}</span>} !!</h1>
                <div className="ButtonSection">
                    <Button className="PlayButton" onClick={goPlay}>PLAY AGAIN!</Button>
                    <Button className="LobbyButton" onClick={goBack}>To The Lobby</Button>
                </div>
            </div>
        </div>
    )
}

export default GameOver
