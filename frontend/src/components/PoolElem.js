import React from 'react'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { socket } from "./Socket";

const PoolElem = (props) => {
    const history = useHistory()

    const startGame = () => {
        //alert(`PLAYERS ARE ${props.name} and ${props.ownName}`)
        socket.emit("gameRequest", {p1name: props.ownName, p2name: props.name})
        history.push("/gamesetup");
    }

    socket.on("gameRequested", (minRoom) => {
        socket.emit("socketOnRequest", (minRoom))
        history.push("/gamesetup");
    })

    return (
        <div>
        { props.name !== props.ownName && 
            <div className={(props.room === 0) ? "PoolElem" : "Disabled"}>
                <div className="PoolElemInfo">
                    <div><b>{props.name}</b> ({props.room})</div>
                    { (props.room === 0) ?
                        <div>Ready To Play!</div>
                        :
                        <div>(Currently playing...)</div>
                    }           
                </div>
                <div className="PoolElemButton">
                    { (props.room === 0) ?
                        <Button onClick={startGame}>PLAY!</Button>
                        :
                        <Button disabled>xxxxx</Button>
                    } 
                    
                </div>
            </div>
        }
        </div>
    )
}

export default PoolElem
