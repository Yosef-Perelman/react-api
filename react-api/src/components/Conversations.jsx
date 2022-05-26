import { Col, Row, Tab, Nav } from 'react-bootstrap';
import "./Conversations.css"
import NaviMe from '../items/NaviMe';
import ConvBoard from '../items/ConversationBoard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import frog1 from "./frog1.jpg";
import frog2 from "./frog2.jpg";
import anon from "./anon.png";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function Conversations() {
    const[connection, SetConnection] = useState();

    
    const connectToServer = async () => {
        try{
            const connection = new HubConnectionBuilder().
            withUrl('http://localhost:5287/chatHub').
            configureLogging(LogLevel.Information).build();

            connection.on("NewUser", (mess) =>
                {
                    console.log(mess);
                }
            )
            connection.on("ReciveContact", (mess) =>
                {
                    console.log(mess);
                }
            )
            connection.on("ReceiveMessage", (mess) =>
                {
                    console.log(mess);
                }
            )
            await connection.start();
            await connection.invoke("Join");
            SetConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

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

    var lastMessageListArr = ["my old freind", "", "", "", ""];
    var lastTimeListArr = lastTimeListArr = ["15:14:15", "", "", "", ""];

    var result = [];

    const [initialNames, setinitialNames] = useState([]);
    const [initiNames, setInitiNames] = useState([]);
    const [lastMessageList, setLastMessageList] = useState(lastMessageListArr);
    const [lastTimeList, setLastTimeList] = useState(lastTimeListArr);


    useEffect(async () => {
        const resp = await fetch('http://localhost:5287/api/contacts/');
        const data = await resp.json();


        for (var i in data) {
            const obj = { "name": data[i].name };
            result.push(obj);
        }

        setinitialNames(result);
        setInitiNames(result);
        connectToServer();
    }, []);

    const listNames = initiNames.map((now, key) => {
        return <NaviMe name={now.name} key={key} lastMessage={lastMessageList[key]} lastTime={lastTimeList[key]} />
    });
    const listBoards = initialNames.map((now, key) => {
        return <ConvBoard userName = {username} name={now.name} key={key} setLastMessage={setLastMessageList} lastMessageList={lastMessageList} index={key}
            setLastTime={setLastTimeList} lastTimeList={lastTimeList} />
    });

    async function postNewContact(newContact) {
        const response =
            await fetch('http://localhost:5287/api/contacts/' + username, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "Id": newContact, "name": newContact, "server": "" })
            });
        return response.json();
    }

    const addContact = async () => {
        let newContact = prompt("New contact name:");
        if (newContact !== "" && newContact != null) {
            postNewContact(newContact);
            setinitialNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
            setInitiNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
            await connection.invoke("AddedContact");
        }
    }

    return (
        <>
            <Tab.Container id="everything" >
                <Row>
                <p style={{"margin": "0px 10px"}}> To rate the app tap <a href="http://localhost:5287/" target="_blank">here</a> </p>
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