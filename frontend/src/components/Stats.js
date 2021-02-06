import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../App"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { socket } from "./Socket";

import "./Lobby.css"

const Stats = () => {
    const history = useHistory()
    const [userStats, setUserStats] = useState({
        gamesPlayed: 0, gamesWon: 0, 
        pointsFor: 0, pointsAgainst: 0,
        lastGame: true, lastOpponent: ""
    });
    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        axios.get("/api/users/profile", {
            headers: {
              "auth-token": userData.token,
            },
          }).then((response) => {
            setUserStats(response.data.stats)
        });
    }, [])

    const goBack = () => {
        history.push("/");
    }

    return (
        <div>
            <div className="StatContent">
                <h1>STATS of {userData.user.name}</h1>
                {( userStats.gamesPlayed > 0 ) ? 
                    <div className="StatText">
                        <h4>You have finished <span style={{color:"red"}}>{userStats.gamesPlayed}</span> Games so far.</h4>
                        <h4>And won <span style={{color:"red"}}>{userStats.gamesWon}</span> of them.</h4>
                        <h2>Nice.</h2>
                        <h4>You've received <span style={{color:"red"}}>{userStats.pointsFor}</span> Points altogether.</h4>
                        <h4>Your opponents have received <span style={{color:"red"}}>{userStats.pointsAgainst}</span>.</h4>
                        <h4>Last time you played with <span style={{color:"red"}}>{userStats.lastOpponent}</span></h4>
                        {(userStats.lastGame) ? 
                            (<h2><span style={{color:"red"}}>And You Won!</span></h2>)
                            : 
                            (<h2><span style={{color:"red"}}>And You Lost :(</span></h2>)
                        }
                        <h4>Sooo it's probably time to try again!</h4>
                    </div> 
                    :
                    <div>
                        <h2>No Game, No Stats...</h2>
                        <br/><br/>
                        <h2>¯\_(ツ)_/¯</h2>
                        <br/><br/>
                        <h6>(it's either still loading your data or you've never ever played a game)</h6>
                    </div>
                }
                
                <div className="StatBackDiv">
                    <Button className="StatBackButton" onClick={goBack}>ok thanks that was quite interesting</Button>
                </div>
           </div>
        </div>
    )
}

export default Stats
