import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../App"
import { Button } from "react-bootstrap"
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { socket } from "./Socket";

import "./Lobby.css"
import Chat from './Chat'
import Pool from './Pool'

const Lobby = () => {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory()

    const userStats = () => {
        history.push("/stats");
    }
    const logOut = () => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        socket.emit("logoutUser", userData.user.name)
        localStorage.setItem("auth-token", "");
      }

    return (
        <Container className="MainScreen">
            <Row>
                <Col>
                    <div className="Header">
                        <div className="BigRedBall"></div>
                        <div className="HeaderCenter">
                            <p>
                                <span className="HeaderTitle">&nbsp;&nbsp;CAPSULE SOCCER&nbsp;&nbsp;</span><br/> 
                                <i>Score 3 times to get a point, get 3 points to win!</i>
                            </p>
                            <p>Ready For The Next Game, <b>{userData.user.name}</b>?</p>
                            <div className="HeaderLinks">
                                <div className="StatLinkDiv">
                                    <p>Check Your Stats Here</p>
                                    <Button className="StatButton" onClick={userStats}>Your Stats</Button>
                                </div>
                                <div className="LogOutDiv">
                                    <p>Log Out If You Want</p>
                                    <Button className="LogOutButton" onClick={logOut}>Log Out</Button>
                                </div>
                            </div>
                        </div>
                        <div className="BigRedBall"></div>
                    </div>                     
                </Col>                
            </Row>
            <Row style={{height: "70%"}}>
                <Col className="ChatBlock">
                    <div className="ChatHeader">
                        <p><b>Let's Chat Here</b></p>
                        <p>Say Hello! Don't be shy, <b>{userData.user.name}!</b></p>
                    </div>
                    <Chat />
                </Col>
                <Col className="PoolBlock">
                    <div className="PoolHeader">
                        <p><b>Currently Connected Users</b></p>
                    </div>
                    <Pool />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="Footer">
                        This might be the footer
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Lobby
