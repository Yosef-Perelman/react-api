import {  Col, Row, Tab, Nav } from 'react-bootstrap';
import "./Conversations.css"
import NaviMe from '../items/NaviMe';
import ConvBoard from '../items/ConversationBoard';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import frog1 from "./frog1.jpg";
import frog2 from "./frog2.jpg";
import anon from "./anon.png";


function Conversations() {

    const location = useLocation();
    const username = location.state.name;
    let profilePic = location.state.profilePic;
    if (username === "Ariel") {
        profilePic = frog1;
    }
    if (username === "Yosef") {
        profilePic = frog2;
    }
    if (profilePic === "") {
        profilePic = anon;
    }

    var initialNamesArr = [];
    var initiNamesArr = [];
    var lastMessageListArr = [];
    var lastTimeListArr = [];

    if (username === "Ariel") {
        initialNamesArr = [{ name: "Mom" }, { name: "Dad" }, { name: "Jo" }, { name: "Ann" }, { name: "Ben" }];
        initiNamesArr = [{ name: "Mom" }, { name: "Dad" }, { name: "Jo" }, { name: "Ann" }, { name: "Ben" }];
        lastMessageListArr = ["my old freind", "", "", "", ""];
        lastTimeListArr = ["15:14:15", "", "", "", ""];
    }

    const [initialNames, setinitialNames] = useState(initialNamesArr);
    const [initiNames, setInitiNames] = useState(initiNamesArr);
    const [lastMessageList, setLastMessageList] = useState(lastMessageListArr);
    const [lastTimeList, setLastTimeList] = useState(lastTimeListArr);

    console.log(initialNames);

    const listNames = initiNames.map((now, key) => {
        return <NaviMe name={now.name} key={key} lastMessage={lastMessageList[key]} lastTime={lastTimeList[key]} />
    });
    const listBoards = initialNames.map((now, key) => {
        return <ConvBoard name={now.name} key={key} setLastMessage={setLastMessageList} lastMessageList={lastMessageList} index={key}
            setLastTime={setLastTimeList} lastTimeList={lastTimeList} />
    });


    const addContact = () => {
        let newContact = prompt("New contact name:");
        if (newContact !== "" && newContact != null) {
            console.log(newContact);
            setinitialNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
            setInitiNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
        }
    }

    return (
        <>
            <Tab.Container id="everything">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className='chatMenu'>
                                <span class="d-block p-2 bg-primary text-white">
                                    <table>
                                        <td className='rowspan'>
                                            <img className='profilePicture' src={profilePic} alt=""></img>
                                        </td>
                                        <td>
                                            <tr>
                                                <b>{username}</b>
                                            </tr>
                                            <tr>
                                                <button className='addFriend' onClick={addContact}>Add contact member</button>
                                            </tr>
                                        </td>
                                    </table>
                                </span>
                            </Nav.Item>
                            {listNames}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {listBoards}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default Conversations;