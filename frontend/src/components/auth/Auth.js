import React, { useState, useContext } from "react"
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import axios from "axios"
import Register from "./Register"
import Login from "./Login"
import "./AuthStyle.css"

const Auth = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="AuthBox">
            <Container>
                <Button className="LoginLink" onClick={() => setLogin(true)}>Login</Button> 
                <Button className="RegisterLink" onClick={() => setLogin(false)}>Register</Button>
                
                {login ? 
                    <div>
                        <div className="LoginMsg">
                            <p><b>WELCOME BACK</b> if you have been here before!</p>
                            <p>If not, then quickly&nbsp;<span className="RegSpan" onClick={() => setLogin(false)}>&nbsp;Register&nbsp;</span>&nbsp;please!</p>
                        </div>
                        <Login /> 
                    </div>
                    : 
                    <div>
                        <div className="RegisterMsg">
                            <p>Hi, just make up any nickname</p>
                            <p>you'd like to play under, <b>that's all</b></p>
                        </div>
                        <Register />
                    </div>
                }
            </Container>
        </div>
    )
}

export default Auth