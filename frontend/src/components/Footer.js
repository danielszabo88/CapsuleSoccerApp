import React from 'react'

import github from '../img/github.png'
import youtube from '../img/youtube.png'
import "./Lobby.css"

const Footer = () => {
    return (
        <div className="Footer">
            <h6>Link to the Apps Source Code &nbsp;&nbsp;-&nbsp;&nbsp;
                <a href={"https://github.com/danielszabo88/CapsuleSoccerApp"} target="_blank"><img src={github} style={{width:"28px", height:"28px"}}/></a>
            </h6>
            <h6>Physics Engine Tutorial &nbsp;&nbsp;-&nbsp;&nbsp;
                <a href={"https://www.youtube.com/playlist?list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_"} target="_blank"><img src={youtube} style={{width:"28px", height:"28px"}}/></a>
            </h6>
        </div>
    )
}

export default Footer
