import { Nav } from "react-bootstrap";
import "./NaviMe.css"
import h1 from "./h1.jpg"
import { useState, useEffect } from "react";


function NaviMe({ username, friend }) {

    const [lastMessage, setLastMessage] = useState();
    const [lastTime, setLastTime] = useState();
    useEffect(async () => {
        const resp = await fetch('http://localhost:5287/api/contacts/' + username + '/' + friend + '/messages');
        const data = await resp.json();
        setLastTime(data[data.length - 1].created)
        setLastMessage(data[data.length - 1].content);
    }, []);

    return (
        <Nav.Item className="surr" style={{ "height": "87px", "border": "solid", "border-radius": "5px", "border-width": "1px" }}>
            <div className="inlineClass">
                <Nav.Link className="inlineClass" eventKey={friend}>
                    <img className='friend_pic' src={h1} alt=""></img>
                    <strong>{friend}</strong>
                    <div className="sepe">
                        {lastTime}<strong>{' >'}</strong>
                        <span style={{ "margin": "1px" }}> {lastMessage}</span>
                    </div>
                </Nav.Link>
            </div>
        </Nav.Item >
    );
}

export default NaviMe;